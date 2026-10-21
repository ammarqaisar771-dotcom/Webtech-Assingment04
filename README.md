# webtech-assignment04
## DI-322 Web Technologies - Assignment 04: Slides Application (Frontend only)

### Department of Information Technology, FCIT, University of The Punjab

---

### Features & Working:
1. **Markdown Slide Creation**: Uses a single markdown file to generate slides. Slides are differentiated using three dashes (`---`).
2. **Two-Section Screen**:
   - **Section 1**: Markdown editor for writing the `.md` content.
   - **Section 2**: Realtime preview showing live changes on the slides.
3. **Black Slides Design**: Clean black slide cards with white text.
4. **Navigation Controls**:
   - **Left Button**: Move to previous slide (disabled on the first slide).
   - **Right Button**: Move to next slide (disabled on the last slide).
   - **Full Screen Button**: Opens presentation mode (button text changes to "Exit Full Screen" in presentation mode).
   - **Slide Count**: Displays `{current slide number} / {total number of slides}` at the bottom.
5. **Keyboard Shortcuts**:
   - `Right Arrow`: Next slide
   - `Left Arrow`: Previous slide
   - `F11`: Toggle Full Screen presentation mode
   - `Ctrl + S`: Save slides in browser internal memory
   - `Escape`: Exit presentation mode
6. **Browser Internal Memory**:
   - Slides are saved into `localStorage`.
   - When the browser is closed and reopened, slides reload automatically.

---

### How to Run:
Simply open `index.html` in any web browser. No external libraries or servers are required.
