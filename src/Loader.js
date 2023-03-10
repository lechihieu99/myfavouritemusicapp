import React, { Component } from "react";
import './audio.css'

export default class Loading extends Component {
    render() {
        return(
            <>
            <div class="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            </>
        );
    }
}