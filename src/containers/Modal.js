import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);

    let instance = M.Modal.getInstance(this.Modal);
    instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
    return (
      <div>
        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
          <div className="modal-content">
                    <h2>Hello, my name is Painter.</h2>
                    <h3>Please allow me to use your camera.</h3>
                    <h4>I can draw you with dots on the palette.</h4>
                    <h5>Please enjoy the music that I make from your visual data.</h5>
                    <h6>Feel free to to join with the controls below to adjust characteristics of the audio and video.</h6>
                    <p>When you're done, close me and I'll go away.</p>
                    <h5>For iOS, use Safari</h5>
          </div>
          <div className="modal-footer">
            <button onClick={this.props.clearError} className="modal-close waves-effect waves-green btn-flat">
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;