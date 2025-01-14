import express, { Router } from 'express'
import passport from 'passport'
import '../strategies/magicLink.mjs'

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
      console.log(req.headers)
      console.log(res.headers)
      slug!=="verify" ? res.redirect("sahelimmo://"):res.redirect('https://sahelimmo.info/')
    })
  }
)

// Get Login status

router.get('/login/status', (req, res) => {
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
