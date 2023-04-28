import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';

import { socket } from '../App';

function AddRemove(props) {
    let vessel = props.vessel
    let hw_type = props.hw_type

    function add_rm_hardware(f) {
        console.log("add_rm: " + f)
        socket.emit("add_rm_hardware", f, vessel, String(hw_type + 's'))}

    return (
        <>
        <style type="text/css">
                {`
            .set-title {
            color: white;    
            }
            `}
        </style>
        <Container className="me-auto">
            <div className="d-flex justify-content-end">
                <Row>
                    <Col className="set-title" style={{justifyContent:'right'}}>
                        Add/Remove {hw_type}  {}
                        <ButtonGroup size="sm">
                            <Button variant="primary" onClick={(f) => add_rm_hardware("add")}><strong>+</strong></Button>
                            <Button variant="primary"onClick={(f) => add_rm_hardware("remove")}><strong>-</strong></Button>
                        </ButtonGroup>
                    </Col>
                </Row>   
            </div>         
        </Container>
        </>
    );
}

export default AddRemove;