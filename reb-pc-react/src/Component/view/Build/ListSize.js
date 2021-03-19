import React from 'react'

export default function ListSize() {
    return (
        <div class="dropList">
            <button type="button" class="dropListBtn btn btn-light">
                5 &nbsp;<i class="fal fa-caret-down"></i>
            </button>
            <div class="dropList-menu">
                <a class="dropdown-item" href="#">5</a>
                <a class="dropdown-item" href="#">10</a>
                <a class="dropdown-item" href="#">15</a>
            </div>
        </div>
    )
}