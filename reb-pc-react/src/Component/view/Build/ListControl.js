import React from 'react'

export default function ListControl() {
    return (
        <div class="btn-group" role="group" aria-label="First group">
            <button type="button" class="btn btn-outline-secondary active">1</button>
            <button type="button" class="btn btn-outline-secondary">2</button>
            <button type="button" class="btn btn-outline-secondary">3</button>
            <button type="button" class="btn btn-outline-secondary">4</button>
            <button type="button" class="btn btn-outline-secondary">5</button>
            <button type="button" class="btn btn-outline-secondary" disabled>...</button>
            <button type="button" class="btn btn-outline-secondary">
                <i class="fal fa-long-arrow-right"></i>
            </button>
        </div>
    )
}
