/* jshint ignore : start */
import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHeaderColumn,
    TableRowColumn
} from 'material-ui/Table';

class MaterialTable extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Table>
                <TableHeader>
                    {this
                        .props
                        .setting
                        .map((e) => (
                            <TableRowColumn>{e.title}</TableRowColumn>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {this
                        .props
                        .data
                        .map((e) => {<TableRow>{
                                this
                                    .props
                                    .setting
                                    .map((column) => {
                                        return <TableHeaderColumn>{column.format && column.format(e[column.attr]) || e[column.attr]}</TableHeaderColumn>
                                    })
                            } </TableRow>
                    })}
                </TableBody>
            </Table>
        );
    }
}

export {MaterialTable};
/* jshint ignore : end */