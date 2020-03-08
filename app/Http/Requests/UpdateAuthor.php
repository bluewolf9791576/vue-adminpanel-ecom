<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAuthor extends FormRequest
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
            'photo_delete' => 'sometimes|nullable',
            'photo_file' => 'sometimes|nullable|image',
            'name' => 'sometimes|required',
            'description' => 'sometimes|required',
            'backlinks.*.date' => 'sometimes|required|date',
            'backlinks.*.url' => 'sometimes|required|url',
        ];
    }
}
