import { useState, memo } from "react";
import "./App.scss";
import _debounce from "lodash/debounce";
import { getMock } from "./util/interface";
import loadingSvg from "./image/loading.svg";
import { STATUS, QQ_REG } from "./constant";
import axios from "axios";

// 加载
const Spin = (status: string, msg: string) => {
  let tip;
  switch (status) {
    case STATUS.loading:
      tip = <img src={loadingSvg} alt="" />;
      break;
    case STATUS.empty:
      tip = "暂无数据";
      break;
    case STATUS.error:
      tip = msg;
      break;
    default:
      break;
  }
  return <div className="center">{tip}</div>;
};

// 用户搜索卡片
const CardItem = memo(({ userInfo }: any) => {
  return (
    <div className="card">
      <div className="card-left">
        <img src={userInfo?.qlogo} alt="" />
      </div>
      <div className="card-right">
        <div className="text-one name">{userInfo?.name || "未命名"}</div>
        <div className="text-one mobile">{userInfo?.qq}</div>
      </div>
    </div>
  );
});

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [status, setStatus] = useState("empty");
  const [msg, setMsg] = useState("");

  let source: any;
  const cancelRequest = () => {
    if (typeof source === "function") {
      source("终止请求");
    }
  };
  const changeFn = _debounce(async (e: any) => {
    const value = e.target.value;

    if (!QQ_REG.test(value) || value.length > 11) {
      setStatus("error");
      setMsg("请输入正确的qq号");
      return;
    }

    setStatus("loading");
    let CancelToken = axios.CancelToken;
    source = CancelToken.source();

    // 取消上一次请求
    cancelRequest();
    axios
      .post(`/api/qq.info?qq=${value}`, {
        cancelToken: new axios.CancelToken(function executor(c) {
          source = c;
        }),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Rquest canceled", err.message); //请求如果被取消，这里是返回取消的message
        } else {
          //handle error
          console.log(err);
        }
      });
  }, 500);
  return (
    <div className="App">
      <h3>QQ查询</h3>
      <input onChange={changeFn} placeholder="请输入qq号" />
      {!status ? (
        <div className="list">
          <CardItem userInfo={userInfo} />
        </div>
      ) : (
        Spin(status, msg)
      )}
    </div>
  );
}

export default App;
