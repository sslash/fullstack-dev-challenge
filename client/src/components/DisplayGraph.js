import React, { Component } from "react";
import PropTypes from "prop-types";
import { VictoryLine, VictoryChart } from "victory";

class DisplayGraph extends Component {
    render() {
        const { data } = this.props;

        const baseProps = {
            width: 450,
            height: 300,
            padding: 50,
            colorScale: ["#48C8FF", "#00b2ff", "#038AD0", "#006C9B"]
        };

        const baseLabelStyles = {
            fontFamily:
                "'Avenir Next', 'Avenir', 'Lato', 'Helvetica', 'Arial', 'Sans-Serif'",
            fontSize: 1.5,
            letterSpacing: "normal",
            padding: 10,
            fill: "#00b2ff",
            stroke: "transparent"
        };

        const theme = {
            area: {
                style: {
                    labels: baseLabelStyles
                }
            },
            axis: Object.assign(
                {
                    style: {
                        axisLabel: baseLabelStyles,
                        grid: {
                            fill: "transparent",
                            stroke: "transparent"
                        },
                        ticks: {
                            fill: "transparent",
                            size: 0,
                            stroke: "transparent"
                        }
                    }
                },
                baseProps
            ),
            line: Object.assign(
                {
                    style: {
                        data: {
                            fill: "transparent",
                            stroke: "#00b2ff",
                            strokeWidth: 2
                        },
                        labels: baseLabelStyles
                    }
                },
                baseProps
            )
        };

        return (
            <div>
                <VictoryChart animate={{ duration: 100 }} theme={theme}>
                    <VictoryLine {...{ data }} y="amount" x="month" />
                </VictoryChart>
            </div>
        );
    }
}

DisplayGraph.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};

export default class DisplayGraphPager extends Component {
    state = { page: 0 };

    render() {
        const { page } = this.state;
        const startIndex = page * 12;
        const endIndex = page * 12 + 12;

        return (
            <div>
                <DisplayGraph
                    data={this.props.data.slice(startIndex, endIndex)}
                />
                <button
                    onClick={() => this.setState({ page: this.state.page - 1 })}
                >
                    Previous
                </button>
                <button
                    onClick={() => this.setState({ page: this.state.page + 1 })}
                >
                    Next
                </button>
            </div>
        );
    }
}
