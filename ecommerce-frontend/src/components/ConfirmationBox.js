import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

export default function ConfirmDelete({ name, onDelete, onClose, open }) {
  return (
    <Modal open={open} size="small" style={{ zIndex: 1001 }}>
      <Header content={`Delete ${name}`} />
      <Modal.Content>
        <p>Are you sure you want to delete {name}?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onDelete}>
          <Icon name="trash alternate" /> Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
}
