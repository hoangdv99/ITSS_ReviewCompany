import React, { useState } from "react";
import "./AddUserModal.css";
import { createNewUser } from "../../config/firebase";

function AddUserModal(props) {
  const { isShow, handleClose } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    createNewUser({ name, email, pass });
    handleClose(false);
  }

  function handleCancel(e) {
    e.preventDefault();
    handleClose(false);
  }

  return isShow ? (
    <div>
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-header">
            <h5 className="title">管理者追加</h5>
            <span>
              <button onClick={() => handleClose(false)}>X</button>
            </span>
          </div>
          <div className="popup-body">
            <form>
              <div className="input-field">
                <div className="label">
                  <label>名前:</label>
                </div>
                <div className="input">
                  <input
                    type="text"
                    style={{ width: "90%" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="label">
                  <label>メールアドレス:</label>
                </div>
                <div className="input">
                  <input
                    type="email"
                    style={{ width: "90%" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="label">
                  <label>パスワード:</label>
                </div>
                <div className="input">
                  <input
                    type="password"
                    style={{ width: "90%" }}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
              </div>
              <div className="btn-group">
                <button className="btn-add" onClick={handleAdd}>
                  追加
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddUserModal;
