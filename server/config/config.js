'use strict';
'use strict';

module.exports = {
 build : {
    server: './utils/server',
    mocker:'./libs/mocker/mocker',
    db:{
    	mappers:{
    		doc:'./libs/database/odm/odm',
    		relational:'./libs/database/orm/orm',
    		keyValue:'',
    		graph:''
    	}
    },
    mock:{
    	user:'../../stubs/user.json'
     },
     schemas:{
      user:'../../schemas/userSchema'
     },
    routes:{
    	root:'./routes',
      secure:'./secure',
    	api:{
    		user: {
    			stub:{
    				get:'/api/user/stub'
    			}
    		}
    	}
    }
  },
  modules:{
  	express:'express',
  	mongoose:'mongoose',
  	http:'http',
  	path:'path',
  	fs:'fs',
  	orm:'orm'
  }
};
