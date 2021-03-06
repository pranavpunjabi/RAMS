import Bookshelf from '../../bookshelf';
import Promise from 'bluebird';
import checkit from 'checkit';

var rules = {
	title : ['required']
};

require("./user");
require("./resource");
require("./project");

const Collection = Bookshelf.Model.extend({
  tableName:'collections',
  hasTimeStams: true,

  intialize : function() {
    this.on('saving', this.validateSave);
  },

  validateSave: function() {
    return checkit(rules).run(this.attributes);
  },

  resources:  function() {
    return this.belongsToMany("Resource");
  },

  projects: function() {
    return this.belongsToMany("Project");
  },

  user: function() {
    return this.belongsTo("User");
  }

});

export default Bookshelf.model("Collection", Collection);
