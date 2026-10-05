<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Invitation architecture
- Keep all invitation content in one public index route with in-page anchors; guests share one identical invitation.
- Keep wedding settings, families, venues, event schedules and artwork references in a client-safe central configuration; presentation components must not hardcode editable details.
- Use generated, optimized WebP artwork with independent theme tokens for event chapters; image failures retain readable themed compositions.
- Keep entry state transient and compute countdown after hydration; no guest storage or backend is needed for the public invitation.
