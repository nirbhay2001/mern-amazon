// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    // options for cookie
    const options = {

      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000

    };
  
    res.cookie("token", token, options);

    return res.status(statusCode).json({
      success: true,
      user,
      token,
    });
  };


module.exports = sendToken;



  
  