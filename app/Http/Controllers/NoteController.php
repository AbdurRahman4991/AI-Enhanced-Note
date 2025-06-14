<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
      public function index()
    {
        $notes = auth()->user()->notes;
        return Inertia::render('Home', compact('notes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $note = auth()->user()->notes()->create($request->only('title', 'content'));
        return redirect()->back();
    }

   public function update(Request $request, Note $note)
    {
        if (auth()->id() !== $note->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $note->update($request->only('title', 'content'));

        return redirect()->back()->with('success', 'Note updated successfully.');
    }

    public function destroy(Note $note)
    {
        if (auth()->id() !== $note->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $note->delete();

        return redirect()->back()->with('success', 'Note deleted successfully.');
    }
}
