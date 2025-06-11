<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AIEnhancementController extends Controller
{
    public function summarize(Request $request)
{
    $response = Http::withToken(env('OPENAI_API_KEY'))->post('https://api.openai.com/v1/chat/completions', [
        'model' => 'gpt-4.1-nano-2025-04-14',
        'messages' => [
            ['role' => 'user', 'content' => "Summarize this note: " . $request->input('content')],
        ],
        'stream' => true,
    ]);

    return response()->stream(fn() => print($response->body()), 200);
}

}
