module.exports = function (db) {

 var config = require('../../config/config');

        var Device = db.define("device",  {
		     deviceUID:{ type: 'integer' },
		     deviceType:String,
		     deviceName :String,
		     deviceBrand :String,
		     deviceIP:String,
		     deviceMAC:String,
		     created:String
		});

		return Device;
};