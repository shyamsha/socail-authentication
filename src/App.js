import { useState, useEffect } from "react";
import "./App.css";
import { GoogleLogin } from "react-google-login";
import useDrivePicker from "react-google-drive-picker";

function App() {
  const [setFileSelected, setSetFileSelected] = useState();
  const [openPicker, data] = useDrivePicker();
  const token = window.location.search.substring(6);
  useEffect(() => {
    if (data) {
      setSetFileSelected(data.docs[0]);
      console.log(data);
      fetch(`https://www.googleapis.com/drive/v3/files/${setFileSelected.id}`)
        .then((res) => {
          console.log(res);
          res.json();
        })
        .then((result) => console.log(result));
    }
  }, [data]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.live.net/v7.2/OneDrive.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    let dropBox = document.createElement("script");
    dropBox.src = "https://www.dropbox.com/static/api/2/dropins.js";
    dropBox.async = true;
    dropBox.setAttribute("id", "dropboxjs");
    dropBox.setAttribute("data-app-key", "fz7kjqq7ofzgi60");
    document.body.appendChild(dropBox);
    return () => {
      document.body.removeChild(dropBox);
    };
  }, []);

  useEffect(() => {
    let linkedinAPi = `https://api.linkedin.com/v2/me`;
    let url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=781sbw7lgx37yi&client_secret=32j7y3iHbzVmHX87&code=${token}&redirect_uri=http://localhost:3000`;
    if (token) {
      fetch(url)
        .then((res) => {
          let result = res.json();
          console.log(result);
          // fetch(linkedinAPi, {
          //   headers: {
          //     Authentication: "Bearer " + result.data.access_token,
          //   },
          // });
        })
        .then((result) => {
          console.log(result);
        });
    }
  }, [token]);

  const handleSuccess = (event) => {
    if (event.data.type === "profile") {
      console.log(event.data);
      window.close();
    }
  };
  const googleLogin = (response) => {
    console.log(response);
  };

  const fileReader = (e) => {
    setSetFileSelected(e.target.files[0]);
  };

  const dropBox = (file) => {
    const options = {
      success: function (files) {
        alert("Here's the file link: " + files[0].link);
        console.log(files);
      },
      cancel: function () {},
      linkType: "preview",
      multiselect: false,
      extensions: [".pdf"],
      folderselect: false,
      // sizeLimit: 1024,
    };
    window.Dropbox.choose(options);
    setSetFileSelected(file[0]);
  };

  const googleDrive = () => {
    openPicker({
      clientId:
        "970824446389-c8aog99f5ui467iq4lf40gm49ec1jpsk.apps.googleusercontent.com",
      developerKey: "AIzaSyAup-VfockM0qjtsGmJKJPWE7f_LkpqhnI",
      viewId: "DOCUMENTS",
      // token: token, // pass oauth token in case you already have one
      supportDrives: true,
    });
  };

  const launchOneDrivePicker = () => {
    return new Promise((resolve, reject) => {
      var odOptions = {
        clientId: "7ea71fb9-e8a0-4baa-9ac9-be91a7e80783",
        action: "download",
        multiSelect: false,
        openInNewWindow: true,
        advanced: {
          filter: "folder,.pdf",
          //filter: "folder,photo"
        },
        success: (files) => {
          resolve(files);
        },
        cancel: () => {
          resolve(null);
        },
        error: (e) => {
          reject(e);
        },
      };
      window.OneDrive.open(odOptions);
    });
  };

  const oneDrive = (e) => {
    e.preventDefault();
    launchOneDrivePicker()
      .then((result) => {
        if (result) {
          console.log(result.value[0]);
          // for (const file of result.value) {
          //   const name = file.name;
          //   const url = file["@microsoft.graph.downloadUrl"];
          //   console.log({ name: name, url: url });
          // }
        }
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  const linkedin = () => {
    let oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=781sbw7lgx37yi&scope=r_liteprofile%20r_emailaddress&state=123456&redirect_uri=http://localhost:3000`;

    window.open(oauthUrl, "_self");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={linkedin} style={{ cursor: "pointer" }}>
          Login with Linkedin
        </div>
        <div>
          <p></p>
        </div>
        <GoogleLogin
          clientId="970824446389-jdbnim2aj2df7krahcflm8ifhk4s1tlk.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={googleLogin}
          onFailure={googleLogin}
          cookiePolicy={"single_host_origin"}
        />
        <div>
          <p></p>
        </div>
        <input type="file" onChange={fileReader} />
        <div>
          <p></p>
        </div>
        <div onClick={oneDrive} id="OpenOneDrive" style={{ cursor: "pointer" }}>
          oneDrive
        </div>
        <div>
          <p></p>
        </div>
        <div onClick={dropBox} style={{ cursor: "pointer" }}>
          dropBox
        </div>
        <div>
          <p></p>
        </div>
        <div onClick={googleDrive} style={{ cursor: "pointer" }}>
          GoogleDrive
        </div>
      </header>
    </div>
  );
}

export default App;
