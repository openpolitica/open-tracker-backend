'use strict';

const { router } = require('../../../helpers/express-callback');

router.use('/congressperson', require('./congressperson'));
router.use('/location', require('./location'));
router.use('/committee', require('./committee'));
router.use('/parliamentary-group', require('./parliamentary-group'));
router.use('/search', require('./search'));
router.use('/bill', require('./bill'));
router.use('/bill-status', require('./bill-status'));
router.use('/legislature', require('./legislature'));

module.exports = router;
