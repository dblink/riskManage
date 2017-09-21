/* jshint ignore : start */
import React from 'react';
import {style} from '../style/theme';
import {Button} from './button';

export const Palette = (props) => {
    let theme = style[props.theme];
    return (
        <div className="title clear-both table" style={theme.title}>
            <div className="va-middle clear-both">
                <div
                    className="display-inline-block"
                    style={{
                    "font-size": "18px",
                    "width": props.button ? "50%": "auto"
                }}>
                    <span
                        style={{
                        "margin-left": "10px"
                    }}>{props.title}</span>
                </div>
                {props.button
                    ? <div className="display-inline-block width-percent-50 text-right">
                            {props
                                .button
                                .map((e) => (
                                    <Button style={theme.titleButton} operate={e.operate}>
                                        {e.name}
                                    </Button>
                                ))}
                        </div>
                    : ""}
            </div>
        </div>
    );
};
/* jshint ignore : end */