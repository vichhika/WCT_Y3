@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Congratuation') }}</div>

                <div class="card-body">
                    <div class="alert alert-success" role="alert">
                        Your email is verified. Thanks you for using our platform.
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
