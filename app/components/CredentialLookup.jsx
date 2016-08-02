import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import Dropzone from 'react-dropzone';

export default class CredentialLookup extends React.Component {
  constructor(props) {
    super(props);
    var homeDir = os.homedir();
    this.onCredentialStoreChange = this.onCredentialStoreChange.bind(this)
    this.state = {
      homeDir: homeDir,
      kankleDir: `${homeDir}/.kankle`,
      filePath: `${homeDir}/.kankle/gce.json`,
      config: null
    };
  }

  static contextTypes = {
    CredentialLookupActions: PropTypes.object.isRequired,
    CredentialStore: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  // getChildContext(){
  //   // CredentialStore: CredentialStore
  // }

  componentDidMount(){
    this.context.CredentialStore.listen(this.onCredentialStoreChange)
    this.context.CredentialLookupActions.findCredentialFile(this.state.filePath);
  }

  onCredentialStoreChange(storeEvent){
    this.state['config'] = storeEvent.options.config;
    this.context.router.push(
      {
        pathname:'/app',
        query: { filePath: this.state.filePath },
        state: this.state
      }
    );

  }

  render(){
    if(this.state.config) {
      return <div></div>;
    }else{
      return (
        <div>
          <form>
            <Dropzone onDrop={this.onDrop} multiple={false} accept={'application/json'}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </form>
        </div>
      );
    }
  }
}


// var CredentialLookup = React.createClass({
//   mixins: [Reflux.ListenerMixin],
//   getInitialState: function () {
//     const homeDir = os.homedir();
//     return {
//       homeDir: homeDir,
//       kankleDir: `${homeDir}/.kankle`,
//       filePath: `${homeDir}/.kankle/gce.json`,
//       config: null
//     };
//   },
//   componentDidMount: function () {
//     this.listenTo(CredentialStore, this.onCredentialStoreChange);
//     CredentialLookupActions.findCredentialFile(this.state.filePath);
//   },
//   contextTypes: function() {
//     router: React.PropTypes.func.isRequired
//   },
//   contextParams: function(){
//     this.context.router.getCurrentParams();
//   },
//   onCredentialStoreChange: function(storeEvent){
//     console.log(storeEvent);
//     this.setState({ config: storeEvent.options.config })
//   },
//   onDrop: function (files) {
//     event.preventDefault();
//     const file = files[0];
//     const fileData = CredentialLookupActions.readFile(file.path);
//
//     if(this.pathExists(this.state.kankleDir)){
//       fs.mkdir(this.state.kankleDir, (err, folder) => {
//         if(err){
//           console.error(err);
//         }else{
//           fs.writeFile(this.state.filePath, fileData, (err, data) => {
//             (err) ? console.error(err) : this.setState({ config: data });
//           })
//         }
//       });
//     }else{
//       fs.writeFile(this.state.filePath, fileData, (err, data) => {
//         (err) ? console.error(err) : this.setState({ config: data });
//       })
//     }
//   },
//   onOpenClick: function () {
//     this.refs.dropzone.open();
//   },
//   render: function() {
//     if(this.state.config) {
//       debugger
//       this.context.router.push(
//         {
//           pathname:'/storage',
//           query: { modal: true },
//           state: { config: this.state.config }
//         }
//       );
//     }else{
//       return (
//         <div>
//           <form>
//             <Dropzone onDrop={this.onDrop} multiple={false} accept={'application/json'}>
//               <div>Try dropping some files here, or click to select files to upload.</div>
//             </Dropzone>
//           </form>
//         </div>
//       );
//     }
//
//   }
// });
//
// module.exports = CredentialLookup;
