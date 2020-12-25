import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import MarkdownView from "react-showdown";
const { Header, Sider, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: ""
    };
    this.setMarkdown = this.setMarkdown.bind(this);
  }

  setMarkdown(e) {
    console.log("Got message: ", e);
    this.setState({
      markdown: e.detail,
    });
  }

  componentDidMount() {
    document.addEventListener(
      "serverdiscription:UI:markdown",
      this.setMarkdown,
      false
    );
    if (process.env.NODE_ENV !== "production") {
      document.dispatchEvent(
        new CustomEvent("serverdiscription:UI:markdown", {
          detail: `
## Conquest Classics by Maxinger15
- 30 Hz tickrate
- 64 Players
          
## Maps
| Map | Rounds |
|======================|=======|
|Operation Firestorm | 2 |
|Caspian Border | 2 |
          
## Rules
- Abusive/swear words -> Ban
- No vehicle stealing
- Play fair and be kind
          
## Killstreaks
- Bugs: https://github.com/Maxinger15/VU-Killstreak/issues
- Feature requests: https://github.com/Maxinger15/VU-Killstreak/issues`,
        })
      );
    }
  }
  componentWillUnmount() {
    document.removeEventListener(
      "serverdiscription:UI:markdown",
      this.setMarkdown,
      false
    );
  }

  render() {
    return (
      <>
        <Layout style={{ height: "100vh" }} className={"overallBackground"}>
          <Header
            className={"overallBackground"}
            style={{ height: "15%" }}
          ></Header>
          <Layout style={{background:"transparent"}}>
            <Content className={"overallBackground"}></Content>
            <Sider className={"overallBackground"} width="20%">
              <div className={"discription"} style={{height:"fit-content"}}>
                <div style={{height:"fit-content",marginLeft:"10px",paddingBottom:"1px"}}>
                <MarkdownView
                  markdown={this.state.markdown}
                  options={{ tables: true, emoji: true }}
                />
                </div>
                
              </div>
            </Sider>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default App;
