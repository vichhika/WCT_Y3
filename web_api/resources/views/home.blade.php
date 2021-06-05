@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Congratuation') }}</div>

                <div class="card-body">
                    <div class="alert alert-success" role="alert">
                        {{ __('passwords.reset') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
