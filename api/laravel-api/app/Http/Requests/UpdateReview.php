<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReview extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'rating' => 'sometimes|between:1,5',
            'status' => 'sometimes|required',
            'author' => 'sometimes|required',
            'publication_date' => 'sometimes|required|date',
            'book_id' => 'sometimes|required',
        ];
    }
}
