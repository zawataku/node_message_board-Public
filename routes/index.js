var express = require('express');
var router = express.Router();
const ps = require('@prisma/client');
const prisma = new ps.PrismaClient();
const bcrypt = require('bcrypt');
const axios = require('axios');
require('dotenv').config(); // 環境変数を読むためのやつ

// 認証状態を確認するミドルウェア
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // ログイン済みなら次へ
  } else {
    return res.redirect('/'); // 未ログインなら index へリダイレクト
  }
}

router.get('/', function (req, res, next) {
  res.render('index', { title: 'KIT Message Board' });
});

router.post('/add', async (req, res, next) => {
  try {
    // reCAPTCHA 検証
    const recaptchaResponse = req.body['g-recaptcha-response'];
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // 環境変数からキーを取得

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
    const response = await axios.post(verificationURL);
    if (!response.data.success) {
      return res.status(400).send('reCAPTCHA 認証に失敗しました。');
    }

    // 新規登録処理
    const hashedPassword = await bcrypt.hash(req.body.pass, 10); // パスワードをハッシュ化
    await prisma.user.create({
      data: {
        name: req.body.name,
        mail: req.body.mail,
        pass: hashedPassword,
      },
    });
    console.log('登録に成功しました');
    res.redirect('/');
  } catch (error) {
    next(error); // エラーハンドリング
  }
});

router.post('/login', async (req, res, next) => {
  try {
    // reCAPTCHA 検証
    const recaptchaResponse = req.body['g-recaptcha-response'];
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // 環境変数からキーを取得

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
    const response = await axios.post(verificationURL);
    if (!response.data.success) {
      return res.status(400).send('reCAPTCHA 認証に失敗しました。');
    }

    // ログイン処理
    const user = await prisma.user.findUnique({ where: { name: req.body.name } });
    if (!user || !(await bcrypt.compare(req.body.pass, user.pass))) { // パスワードをハッシュ化し，データベース内のものと比較
      return res.status(401).send('ユーザー名またはパスワードが間違っています');
    }

    // ユーザー情報をセッションに保存
    req.session.user = { id: user.id, name: user.name };

    console.log('ログインに成功しました');
    res.redirect('/home'); // ログイン後のページにリダイレクト
  } catch (error) {
    next(error); // エラーハンドリング
  }
});

// ログアウト処理
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// /home ルート
router.get('/home', isAuthenticated, (req, res) => {
  res.render('home', { title: 'Home', user: req.session.user });
});

module.exports = router;