import React from "react";
import './ResultCard.css'

export default function ResultCard({children}) {
    return (
        <div className="result-item">
            {children}
        </div>
    );
}