
export async function loginGet(req, res) {
  try {
    return res.render('login');
  } catch (error) {
    console.log(error);
    return res.render('404', { errMsg: error });

  }
}
