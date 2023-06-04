const jwt = require("jsonwebtoken")
function generateAccessToken (user) {
return jwt.sign(user, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NTkwNDQ5NywiaWF0IjoxNjg1OTA0NDk3fQ.7CoG7NegBuy6NXN_ynOcdiEDvk6rFfCVcZAbyg7rlGw", {expiresIn: "24h"})
}
module.exports=generateAccessToken