import './App.css';
import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardImg, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.getItems = this.getItems.bind(this);
    this.invertSelect = this.invertSelect.bind(this);

    this.state = {
      activeTab: '1',
      items: []
    };
  }

  componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://18.139.137.183:8080/favourite.json";
    var app = this;

    fetch(proxyurl + url)
    .then(result => result.json())
    .then(function(response){
      response.map(item => {
        item.selected = false;
      });
      app.setState({items: response});
    })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  getItems() {
    var itemList = [];
    if (this.state.activeTab == 1)
      itemList = this.state.items;
    else
      itemList = this.state.items;
    return itemList;
  }

  invertSelect(index) {
    var items = this.state.items;
    items[index].selected = !items[index].selected;
    this.setState({items: items});
  }

  render() {
    var items = this.getItems();
    var dom = this;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              List
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Favourites
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              {
                items.map(function(info, index){
                  return <Col xs="1" sm="2">
                    <Card body className={ info.type == "offer" ? "single-item-offer" : "single-item-intership" }>
                      <img className="item-image" src={info.imageUrl} alt="Download Failed"/>
                      <Row className="item-text">
                        <Col xs="12" className="item-title">{info.title}</Col>
                        <Col xs="12" className="item-desc">{info.desc}</Col>
                        <Col xs="12" className="item-count">{new Intl.NumberFormat('en-US', { maximumFractionDigits: 1}).format(info["view-count"] / 1000)}k visited</Col>
                      </Row>
                      <Button color={info.selected == true ? "secondary" : "primary"} onClick={() => {dom.invertSelect(index);}}>{info.selected == false ? "Select" : "Deselect"}</Button>
                    </Card>
                  </Col>
                })
              }
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {
                items.map(function(info, index){
                  if (info.selected == true) {
                    return <Col xs="1" sm="2">
                    <Card body className={ info.type == "offer" ? "single-item-offer-tab-b" : "single-item-intership-tab-b" }>
                      <img className="item-image" src={info.imageUrl} alt="Download Failed"/>
                      <div className="item-title">{info.title}</div>
                      <div className="item-desc">{info.desc}</div>
                    </Card>
                  </Col>
                  }
                })
              }
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}