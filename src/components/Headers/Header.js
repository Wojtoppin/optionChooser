/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = (props) => {

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {props.index && <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Price
                        </CardTitle>
                        <input type="range" min={0} max={100} value={props.csV} onMouseUp={() => props.fetchDataAndUpdateCharts(1)} onChange={(event)=>props.handleSliderChange(event,1)}/>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="ni ni-money-coins" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                         {props.csV}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Course
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          <input type="range" min={0} max={100} value={props.psV} onMouseUp={() => props.fetchDataAndUpdateCharts(1)}  onChange={(((event)=>props.handleSliderChange(event,2)))}/>
                          </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="ni ni-world" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        {props.psV}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Air Conditioning
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          <input type="range" min={0} max={100} value={props.klsV} onMouseUp={() => props.fetchDataAndUpdateCharts(1)}  onChange={(((event)=>props.handleSliderChange(event,3)))}/>
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="ni ni-sound-wave" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        {props.klsV}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Average repair cost
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        <input type="range" min={0} max={100} value={props.kosV} onMouseUp={() => props.fetchDataAndUpdateCharts(1)}  onChange={(((event)=>props.handleSliderChange(event,4)))}/>
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="ni ni-settings" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        {props.kosV}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>}
            {props.tables && <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Model
                        </CardTitle>
                        <input type="text" name="name" value={props.filterText} onChange={(event)=>props.handleFilteredText(event)} onKeyUp={props.filterCars}/>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                         {props.csV}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="2">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Price
                        </CardTitle>
                        <input type="range" min={0} max={100} value={props.csV} onMouseUp={() => props.fetchDataAndUpdateCharts(1)} onChange={(event)=>props.handleSliderChange(event,1)}/>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                         {props.csV}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="2">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          course
                        </CardTitle>
                        <input type="range" min={0} max={100} value={props.csV} onMouseUp={() => props.fetchDataAndUpdateCharts(1)} onChange={(event)=>props.handleSliderChange(event,1)}/>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                         {props.csV}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="1">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          AC
                        </CardTitle>
                        <input type="checkbox" />
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                         {props.csV}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="2">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Repair Cost
                        </CardTitle>
                        <input type="range" min={0} max={100} value={props.csV} onMouseUp={() => props.fetchDataAndUpdateCharts(1)} onChange={(event)=>props.handleSliderChange(event,1)}/>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                         {props.csV}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="2">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          producer
                        </CardTitle>
                        <select>
                          <option value="null"></option>
                            {Array.isArray(props.producers) &&
                              props.producers !== undefined &&
                              props.producers.map((element) => (
                              <option key={element.ID} value={element.ID}>
                                {element.producer}
                              </option>
                            ))}      
                          <option value="value3">Option 3</option>
                        </select>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                         {props.csV}
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
