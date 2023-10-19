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
import { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
  Input,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Create_Generic_Tables = (props) => {


  const [rowCount, setRowCount] = useState(props.generic_table.length === 0?2:props.generic_table.length)
  const [rows, setRows] = useState(props.generic_table.length === 0?
    [{name:"ID", type:"number", sorting:"don't show as a chart variable"},{name:"name", type:"text", sorting:"don't show as a chart variable"},]:props.generic_table
  )
  
  




  const updateRowCount = (event) =>{
    let new_rows = [...rows]
    setRowCount(event.target.value);
    while(event.target.value > new_rows.length){
      new_rows.push({"name":"rowName" + new_rows.length, "sorting":"ASC", "type":"number"});
      
    }
    while(event.target.value < new_rows.length){
      new_rows.pop();
    }
    setRows(new_rows)
  }

  const handleChange = (index, type,event) => {


    if(type === 1){
      setRows((prevRows) => {
        const updatedRows = [...prevRows];

        updatedRows[index] = {
          ...updatedRows[index],
          name: event.target.value,
        };


        return updatedRows
      });
    }
    if(type === 2){
      setRows((prevRows) => {
        const updatedRows = [...prevRows];

        updatedRows[index] = {
          ...updatedRows[index],
          type: updatedRows[index].type === "text" ? "checkbox" : updatedRows[index].type === "checkbox" ? "slider":"text",
        };


        return updatedRows
      });
    }
    if(type === 3){
      setRows((prevRows) => {
        const updatedRows = [...prevRows];

        updatedRows[index] = {
          ...updatedRows[index],
          sorting: updatedRows[index].sorting === "ASC" ? "DESC" : updatedRows[index].sorting === "DESC"? "don't show as a chart variable": "ASC",
        };


        return updatedRows
      });
    }
  };
  

  useEffect(()=>{
    console.log(props)
  },[props])

  return (
    <>
      <Header/>

      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
          <Card className="shadow">
              
          <CardHeader className="border-0">

          <div>
            Set row count: <input type="number" name="rows" id="rows" min="2" value={rowCount} onChange={updateRowCount}/>
            </div>

          <div style={{float:"right"}} className="mb-0">
              </div>
          </CardHeader>
        
           
           <Table
            style={{textAlign:"center"}}
            className="align-items-center table-flush"
            responsive
            
          >
            <thead className="thead-light">
            <tr>
                <th scope="col" style={{width:"20vw"}}>column name</th>
                <th>type</th>
                <th>sorting type</th>
            </tr>
            </thead>

            <tbody>

              {Array.isArray(rows) && rows.map((element, index)=>(
                <tr key={index}>
                  <th>
                    <Input
                      bsSize="lg"
                       type="text"
                        name="name"
                         id="name"
                          value={element.name}
                           onChange={(event) => handleChange(index,1,event)}/>
                  </th>
                  <th>
                    {element.type}<br/>
                  <Button
                      color="primary"
                      href="#pablo"
                      size="sm"
                      name={element + "sorting"} id={element + "sorting"} onClick={(event) => handleChange(index,2,event)}
                    >
                      Change Type
                    </Button>
                  </th>
                  
                  <th>
                    {element.sorting}<br/>
                    <Button
                      color="primary"
                      href="#pablo"
                      size="sm"
                      name={element + "sorting"} id={element + "sorting"} onClick={(event) => {handleChange(index,3,event)}}
                    >
                      Change Sorting Type
                    </Button>
                  </th>
              </tr>
              ))}
              



            </tbody>
            <tfoot>
              <tr>
                <th colSpan={5} style={{textAlign:"center"}}>
                  <Button color="primary" onClick={() => {props.setGeneric_table(rows)}}>Wyślij</Button>
                </th>
              </tr>
            </tfoot>
          </Table>
        



        </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Create_Generic_Tables;
