import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default ({ size, isOpen, toggle, header, footer, children }) => (
    <Modal size={size} isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{header}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer ? <ModalFooter>{footer}</ModalFooter> : null}
    </Modal>
)