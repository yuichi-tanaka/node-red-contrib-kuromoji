module.exports = function(RED){
  /**
   * morphological_analyzer
   * Parameters:
   * - dictionaly_dir
   */
  function morphological_analyzer(config){
    RED.nodes.createNode(this,config);
    var node = this;
    var kuromoji = require('kuromoji');
    var tknz = null;
    var dic_dir = config.dictionaly_dir || "node_modules/node-red-contrib-kuromoji/node_modules/kuromoji/dist/dict" ;
    console.log(dic_dir);
    try {
      this.on('input', function(msg){
        var origin = msg.origin;
        var list = tknz.tokenize(origin);
        msg.result = list;
        node.send(msg);
      });
    } catch(e) {
      node.error(e);
    }
    kuromoji.builder({dicPath:dic_dir}).build(function(err,tokenizer){
      tknz = tokenizer;
    });
  };
  RED.nodes.registerType("morphological_analyzer",morphological_analyzer);
};
