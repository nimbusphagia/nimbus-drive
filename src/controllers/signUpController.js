import { initializeUser } from "../../db/queries.js";

export async function signUpGet(req, res) {
  try {
    return res.render('signUp');
  } catch (error) {
    console.log(error);
    return res.render('404', { errMsg: error });
  }
}
export async function signUpPost(req, res) {
  try {
    const { username, password } = req.body;
    await initializeUser(username, password);
    return res.redirect('/login')
  } catch (err) {
    console.log(err);
    return res.render('404', { errMsg: err.message });
  }
}
