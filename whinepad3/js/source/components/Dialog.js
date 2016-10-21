/* @flow */

import React, { Component } from 'react';

import Button from './Button';

type Props = {
  header: string,
  confirmLabel: string,
  modal: boolean,
  onAction: Function,
  hasCancel: ?boolean,
  children?: Array<any>,
};

class Dialog extends Component {

  props: Props;

  static defaultProps = {
    confirmLabel: 'ok',
    modal: false,
    onAction: (_) => {},
    hasCancel: true,
  };

  componentWillUnmount() {
    document.body.classList.remove('DialogModalOpen');
  }

  componentDidMount() {
    if (this.props.modal) {
      document.body.classList.add('DialogModalOpen');
    }
  }

  render() {
    const { children, confirmLabel, hasCancel, header, modal, onAction } = this.props;
    return (
      <div className={modal ? 'Dialog DialogModal' : 'Dialog'}>
        <div className={modal ? 'DialogModalWrap' : null}>
          <div className="DialogHeader">{header}</div>
          <div className="DialogBody">{children}</div>
          <div className="DialogFooter">
            {hasCancel
              ? <span
                  className="DialogDismiss"
                  onClick={onAction.bind(null, false)}>
                  Cancel
                </span>
              : null
            }
            <Button onClick={onAction.bind(null, hasCancel)}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog
