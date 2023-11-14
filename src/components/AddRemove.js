import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';

import { socket } from '../App';

function AddRemove(props) {

    let vessel = props.vessel
    let hw_type = props.hw_type

    function add_rm_hardware(f) {
        console.log(vessel + ": " + f + " " + hw_type)
        socket.emit("add_rm_hardware", f, vessel, String(hw_type + 's'))}

    return (
        <>
            <style type="text/css">
                    {`
                .btn-sm3 {
                    padding: .05rem .5rem;
                    font-size: .8rem;
                }
                `}
            </style>

            <Container >
                <div className="d-flex justify-content-end">
                    <Row>
                        <Col style={{justifyContent:'right'}}>
                            <small><small>Add/Remove</small></small>&nbsp; 
                            <ButtonGroup >
                                <Button variant="primary" size='sm3' onClick={(f) => add_rm_hardware("add")}><strong>+</strong></Button>
                                <Button variant="primary" size='sm3' onClick={(f) => add_rm_hardware("remove")}><strong>-</strong></Button>
                            </ButtonGroup>
                        </Col>
                    </Row>   
                </div>         
            </Container>
        </>
    );
}

export default AddRemove;