import express, { Router } from 'express'
import passport from 'passport'
import '../strategies/magicLink.mjs'
import '../strategies/jwt.mjs'
import jwt from 'jsonwebtoken'

import {} from 'dotenv/config'
const router = Router()
router.use(express.json())
router.get('/', (req, res) => {
  console.log('The main auth page!')
})

// Sending email requests and getting status messages

router.post(
  '/login/email',
  passport.authenticate('magiclink', {
    action: 'requestToken',
    failureMessage: 'Email Not Sent',
  }),
  (req, res) => {
    return res.send({ msg: 'Email sent!' })
  }
)

// verifying link send by email

router.get(
  '/login/email/:slug',
  passport.authenticate('magiclink', {
    action: 'acceptToken',
  }),
  (req, res) => {
    const { slug } = req.params
  
    req.login(req.user, function (err) {
      if (err) {
        return next(err)
      }
      
      console.log(req.headers.cookie);
      if (slug !== 'verify') {
        console.log(req.user._id);
          const accessToken = jwt.sign(
            {
              id: req.user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
          )
        res.redirect(`sahelimmo://?token=${accessToken}`)
      } else {
        res.redirect('https://sahelimmo.info/')
      }
    
      
    })
  }
)

// Get Login status

router.get('/login/status', (req, res) => {
  console.log(req.session);
  console.log(req.signedCookies);
  req.user ? res.send(req.user) : res.send({ error: 'You are not logged in!' })
})
router.get('/jwt/status', passport.authenticate('jwt',{session:false}),(req, res) => {
 
  req.user ? res.send(req.user) : res.send({ error: 'You are not logged in!' })
})

//logout

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return res.send({ error: err })
    }
    return res.send({ msg: 'Logged out!' })
  })
})
export default router
