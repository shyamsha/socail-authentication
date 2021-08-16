import { useState } from "react";
import "./App.css";
import { GoogleLogin } from "react-google-login";
import { Dropbox } from "dropbox";

function App() {
  const [setFileSelected, setSetFileSelected] = useState();
  const signup = (response) => {
    console.log(response);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  const fileReader = (e) => {
    setSetFileSelected(e.target.files[0]);
  };

  const oneDrive = () => {};

  const dropBox = () => {
    const options = {
      // Required. Called when a user selects an item in the Chooser.
      success: function (files) {
        alert("Here's the file link: " + files[0].link);
      },

      // Optional. Called when the user closes the dialog without selecting a file
      // and does not include any parameters.
      cancel: function () {},

      // Optional. "preview" (default) is a preview link to the document for sharing,
      // "direct" is an expiring link to download the contents of the file. For more
      // information about link types, see Link types below.
      linkType: "preview", // or "direct"

      // Optional. A value of false (default) limits selection to a single file, while
      // true enables multiple file selection.
      multiselect: false, // or true

      // Optional. This is a list of file extensions. If specified, the user will
      // only be able to select files with these extensions. You may also specify
      // file types, such as "video" or "images" in the list. For more information,
      // see File types below. By default, all extensions are allowed.
      extensions: [".pdf", ".doc", ".docx", ".txt"],

      // Optional. A value of false (default) limits selection to files,
      // while true allows the user to select both folders and files.
      // You cannot specify `linkType: "direct"` when using `folderselect: true`.
      folderselect: false, // or true

      // Optional. A limit on the size of each file that may be selected, in bytes.
      // If specified, the user will only be able to select files with size
      // less than or equal to this limit.
      // For the purposes of this option, folders have size zero.
      sizeLimit: 1024, // or any positive number
    };
    // Dropbox.choose(options);
    var dbx = new Dropbox({
      accessToken:
        "5-KDDVKc1O4AAAAAAAAAAT7xqpMFIw6F6o4tqxS01IRpAlCaFCLv_1kpI7veqwEh",
    });
    dbx
      .filesListFolder({ path: "" })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <GoogleLogin
          clientId="970824446389-c8aog99f5ui467iq4lf40gm49ec1jpsk.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        {/* <div
          id="g_id_onload"
          data-client_id="869678648838-3a216u28qn05q2qo7c8f7rqq6uhahctr.apps.googleusercontent.com"
          // data-login_uri="www.google.com"
          data-context="signup"
          data-ux_mode="popup"
          data-callback="signup"
          data-auto_prompt="false"
        ></div>
        <div
          class="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
        ></div> */}
        <div>
          <p></p>
        </div>
        <input type="file" onChange={fileReader} value={setFileSelected} />
        <div>
          <p></p>
        </div>
        <div onClick={oneDrive} style={{ cursor: "pointer" }}>
          oneDrive
        </div>
        <div>
          <p></p>
        </div>
        <div onClick={dropBox} style={{ cursor: "pointer" }}>
          dropBox
        </div>
      </header>
    </div>
  );
}

export default App;
