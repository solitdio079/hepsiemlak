import passport from 'passport'
import MagicLink from 'passport-magic-link'
import sendgrid from '@sendgrid/mail'
import Users from '../models/users.mjs'
import {} from 'dotenv/config'

const MagicLinkStrategy = MagicLink.Strategy

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

passport.use(
  new MagicLinkStrategy(
    {
      secret: 'keyboard cat',
      userFields: ['email','isNative'],
      tokenField: 'token',
      verifyUserAfterToken: true,
    },
    function send(user, token) {
      console.log(typeof(user.isNative))
      var link = user.isNative === "true"
        ? 'https://api.sahelimmo.info/auth/login/email/app?token=' + token
        : 'https://api.sahelimmo.info/auth/login/email/verify?token=' + token
      var msg = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Connectez-vous sur Sahel Immo',
        text:
          'Salut! Cliquez le lien ci-dessous pour vous connecter sur Sahel Immo.\r\n\r\n' +
          link,
        html:
          '<h3>Salut!</h3><p> Cliquez le lien ci-dessous pour vous connecter sur Sahel Immo.</p><p><a href="' +
          link +
          '">Sign in</a></p>',
      }
      return sendgrid.send(msg)
    },
    async function verify(user) {
      try {
        const check = await Users.findOne({ email: user.email })
        if (!check) {
          const newUser = new Users({ email: user.email })
          await newUser.save()
          return new Promise(function (resolve, reject) {
            return resolve(newUser)
          })
        }
        return new Promise(function (resolve, reject) {
          return resolve(check)
        })
      } catch (error) {
        return new Promise(function (resolve, reject) {
          return reject(error.message)
        })
      }
    }
  )
)
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    if (user.notifUrl) {
        cb(null, {
         _id: user._id,
         email: user.email,
         fullName: user.fullName,
          notifUrl: user.notifUrl.endpoint,
          phone: user.phone || null,
         isAdmin: user.isAdmin || false,
         isVerified: user.isVerified || false,
         userType: user.userType || 'visitor',
        })
      return 
    }
    cb(null, user)
     
  })
    
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    //console.log(user)
    return cb(null, user)
  })
})
