"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Brand from "@/components/Brand";

const contentTypes = ["Article"];
const insightCategories = ["Field Notes", "Behind the Scenes", "Culture", "Company News", "Impact"];

const emptyDraft = {
  slug: "",
  type: "Article",
  title: "",
  excerpt: "",
  author: "",
  readingTime: "",
  tags: "",
  category: "Documentary",
  location: "Rwanda",
  image: "",
  alt: ""
};

export default function AdminDashboardClient({ stories, insights, site, notices }) {
  const [view, setView] = useState(notices.settingsSaved ? "settings" : "dashboard");
  const [draft, setDraft] = useState(emptyDraft);
  const [contentKind, setContentKind] = useState("story");
  const [bodyHtml, setBodyHtml] = useState("");
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const editorRef = useRef(null);
  const closeButtonRef = useRef(null);

  const localCount = stories.filter((story) => story.isLocal).length;

  const activeHelp = useMemo(() => {
    if (draft.type === "Blog Post") return "Best for short updates, announcements and behind-the-scenes notes.";
    if (draft.type === "Bouncer") return "Best for a promotional item that points people to an external campaign or link.";
    if (draft.type === "Document") return "Best for reports, briefs and file-based updates published like a story.";
    return "Best for complete impact stories, photography stories and documentary case studies.";
  }, [draft.type]);

  useEffect(() => {
    if (editorRef.current && !preview) {
      editorRef.current.innerHTML = bodyHtml;
    }
  }, [bodyHtml, preview]);

  useEffect(() => {
    if (!editorOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") closeEditor();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editorOpen]);

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function startNew(type = "Article") {
    setContentKind("story");
    setDraft({ ...emptyDraft, type });
    setBodyHtml("");
    setPreview(false);
    setEditorOpen(true);
  }

  function startNewInsight() {
    setContentKind("insight");
    setDraft({ ...emptyDraft, type: "Insight", category: "Field Notes", location: "" });
    setBodyHtml("");
    setPreview(false);
    setEditorOpen(true);
  }

  function editStory(story) {
    setContentKind("story");
    setDraft({
      slug: story.slug || "",
      type: story.type || "Article",
      title: story.title || "",
      excerpt: story.excerpt || "",
      author: story.author || "",
      readingTime: story.readingTime || "",
      tags: Array.isArray(story.tags) ? story.tags.join(", ") : story.tags || "",
      category: story.category || "Documentary",
      location: story.location || "Rwanda",
      image: story.image || "",
      alt: story.alt || ""
    });
    setBodyHtml(story.bodyHtml || "");
    setPreview(false);
    setEditorOpen(true);
  }

  function editInsight(insight) {
    setContentKind("insight");
    setDraft({
      slug: insight.slug || "",
      type: "Insight",
      title: insight.title || "",
      excerpt: insight.excerpt || "",
      author: insight.author || "",
      readingTime: insight.readingTime || "",
      tags: Array.isArray(insight.tags) ? insight.tags.join(", ") : insight.tags || "",
      category: insight.category || "Field Notes",
      location: "",
      image: insight.image || "",
      alt: insight.alt || ""
    });
    setBodyHtml(insight.bodyHtml || "");
    setPreview(false);
    setEditorOpen(true);
  }

  function format(command, value = null) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    setBodyHtml(editorRef.current?.innerHTML || "");
  }

  function addLink() {
    const url = window.prompt("Paste the link URL");
    if (url) format("createLink", url);
  }

  function closeEditor() {
    setEditorOpen(false);
    setPreview(false);
  }

  async function uploadImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const result = await response.json();
    setUploading(false);
    if (result.url) {
      updateDraft("image", result.url);
      updateDraft("alt", draft.alt || draft.title || "TrueStory Africa image");
    } else {
      window.alert(result.error || "Upload failed.");
    }
  }

  return (
    <main className="admin-dashboard-page admin-command-center" data-theme="dark">
      <aside className="admin-dashboard-sidebar">
        <div className="admin-sidebar-brand-block">
          <Link className="admin-brand" href="/">
            <Brand size={34} />
          </Link>
        </div>
        <nav className="admin-sidebar-nav">
          <button
            type="button"
            className={`admin-nav-item${view === "dashboard" ? " active" : ""}`}
            onClick={() => setView("dashboard")}
          >
            <span aria-hidden="true">▦</span>
            Dashboard
          </button>
          <details className="admin-sidebar-create">
            <summary className="admin-create-button">
              <span aria-hidden="true">+</span>
              Create New
            </summary>
            <div className="admin-sidebar-create-menu">
              {contentTypes.map((type) => (
                <button type="button" key={type} onClick={() => startNew(type)}>{type}</button>
              ))}
              <button type="button" onClick={startNewInsight}>Insight</button>
            </div>
          </details>
          <button
            type="button"
            className={`admin-nav-item${view === "settings" ? " active" : ""}`}
            onClick={() => setView("settings")}
          >
            <span aria-hidden="true">⚙</span>
            Settings
          </button>
        </nav>
        <form action="/api/admin/logout" method="post" className="admin-sidebar-logout">
          <button type="submit" className="admin-nav-item">
            <span aria-hidden="true">↳</span>
            Logout
          </button>
        </form>
        <Link className="admin-site-link" href="/">View Website</Link>
        <div className="admin-sidebar-footer">Great Lakes Region Bureau</div>
      </aside>

      <section className="admin-dashboard-main" id="dashboard">
        <header className="admin-dashboard-topbar">
          <div>
            <h1>{view === "settings" ? "Settings" : "Admin Dashboard"}</h1>
          </div>
          <div className="admin-profile" aria-label="Admin profile">
            <span>Website Manager</span>
            <strong>
              <Brand size={20} iconOnly />
            </strong>
          </div>
        </header>

        {notices.created && (
          <Notice
            type="success"
            title={notices.createdStatus === "draft" ? "Draft saved" : "Saved"}
            text={
              notices.createdStatus === "draft"
                ? "Saved as a draft. It will not appear on the website until you publish it."
                : "The story is now visible on the website."
            }
          />
        )}
        {notices.deleted && <Notice type="success" title="Deleted" text="The local story was removed from the website." />}
        {notices.createdInsight && <Notice type="success" title="Insight saved" text="The insight is now visible on the website." />}
        {notices.deletedInsight && <Notice type="success" title="Deleted" text="The local insight was removed from the website." />}
        {notices.settingsSaved && <Notice type="success" title="Settings saved" text="Website contact and social details were updated." />}
        {notices.storyError && <Notice type="error" title="Missing content" text="Add at least a headline and excerpt before saving." />}
        {notices.insightError && <Notice type="error" title="Missing content" text="Add at least a headline and excerpt before saving." />}
        {notices.dbError && <Notice type="error" title="Save failed" text="Could not reach the database. Check your connection and try again." />}

        {view === "dashboard" && (
        <section className="admin-stats-grid" aria-label="Website stats">
          <article>
            <span>Total Website Stories</span>
            <strong>{stories.length}</strong>
            <p>{localCount} custom items managed here</p>
          </article>
          <article>
            <span>Image Uploads</span>
            <strong>Ready</strong>
            <p>Upload cover images directly</p>
          </article>
          <article>
            <span>CMS Mode</span>
            <strong>Simple</strong>
            <p>No external tools required</p>
          </article>
        </section>
        )}

        {view === "dashboard" && (
        <section className="admin-panel admin-quick-create-panel" id="create-story">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-panel-kicker">Create Content</p>
              <h2>Add something new</h2>
            </div>
          </div>
          <div className="admin-create-cards">
            {contentTypes.map((type) => (
              <button type="button" key={type} onClick={() => startNew(type)}>
                <strong>{type}</strong>
                <span>{type === "Article" ? "Full impact story" : type === "Blog Post" ? "Short update" : type === "Bouncer" ? "Campaign link" : "Report or brief"}</span>
              </button>
            ))}
            <button type="button" onClick={startNewInsight}>
              <strong>Insight</strong>
              <span>Field notes & commentary</span>
            </button>
          </div>
        </section>
        )}

        {editorOpen && (
          <div className="admin-editor-modal" role="dialog" aria-modal="true" aria-label={`${draft.slug ? "Edit" : "Create New"} ${draft.type}`}>
            <div className="admin-editor-modal-card">
              <header className="admin-editor-modal-header">
                <h2>{draft.slug ? `Edit ${draft.type}` : `Create New ${draft.type}`}</h2>
                <div className="admin-editor-tabs">
                  <button type="button" className={!preview ? "active" : ""} onClick={() => setPreview(false)}>Editor</button>
                  <button type="button" className={preview ? "active" : ""} onClick={() => setPreview(true)}>Preview</button>
                </div>
                <button type="button" className="admin-editor-close" onClick={closeEditor} aria-label="Close editor" ref={closeButtonRef}>×</button>
              </header>

              <form action={contentKind === "insight" ? "/api/admin/insights" : "/api/admin/stories"} method="post" className="admin-modal-form">
                <input type="hidden" name="slug" value={draft.slug} />
                <input type="hidden" name="type" value={draft.type} />
                <input type="hidden" name="bodyHtml" value={bodyHtml} />
                <input type="hidden" name="tags" value={draft.tags} />

                {draft.type === "Blog Post" ? (
                  <div className="admin-blog-modal-body">
                    <label className="admin-modal-title-field">
                      <span>Title</span>
                      <input name="title" value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} placeholder="What's on your mind?" required />
                    </label>

                    <div className="admin-form-row">
                      <label>
                        <span>Category</span>
                        <select name="category" value={draft.category} onChange={(event) => updateDraft("category", event.target.value)}>
                          <option>Culture</option>
                          <option>Photography</option>
                          <option>Behind the Scenes</option>
                          <option>Field Notes</option>
                          <option>Company News</option>
                          <option>Impact</option>
                        </select>
                      </label>
                      <label>
                        <span>Tags</span>
                        <input value={draft.tags} onChange={(event) => updateDraft("tags", event.target.value)} placeholder="e.g. kigali, youth, tech" />
                      </label>
                    </div>

                    <label>
                      <span>Excerpt</span>
                      <textarea name="excerpt" rows="3" value={draft.excerpt} onChange={(event) => updateDraft("excerpt", event.target.value)} placeholder="A short one or two line summary shown on feed cards..." required />
                    </label>

                    <label>
                      <span>Post Body</span>
                      <div className="admin-editor-shell">
                        <div className="admin-editor-toolbar" aria-label="Blog formatting tools">
                          <button type="button" onClick={() => format("bold")} aria-label="Bold text">B</button>
                          <button type="button" onClick={() => format("italic")} aria-label="Italic text">/</button>
                          <button type="button" onClick={() => format("underline")} aria-label="Underline text">U</button>
                        </div>
                        <div
                          ref={editorRef}
                          className="admin-rich-editor admin-blog-rich-editor"
                          contentEditable
                          role="textbox"
                          aria-label="Blog post body"
                          aria-multiline="true"
                          suppressContentEditableWarning
                          data-placeholder="Write your post..."
                          onInput={() => setBodyHtml(editorRef.current?.innerHTML || "")}
                        />
                      </div>
                    </label>

                    <div className="admin-form-row">
                      <label>
                        <span>Author</span>
                        <input name="author" value={draft.author} onChange={(event) => updateDraft("author", event.target.value)} placeholder="Name of writer" />
                      </label>
                      <label>
                        <span>Location</span>
                        <input name="location" value={draft.location} onChange={(event) => updateDraft("location", event.target.value)} />
                      </label>
                    </div>

                    <label>
                      <span>Cover Image</span>
                      <label className="admin-upload-box admin-blog-upload-box">
                        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={uploadImage} />
                        <span>{uploading ? "Uploading..." : draft.image ? "Cover Image Added" : "Upload Cover Image"}</span>
                      </label>
                    </label>
                    <input type="hidden" name="image" value={draft.image} />
                    <input type="hidden" name="alt" value={draft.alt || draft.title} />

                    <div className="admin-modal-actions admin-blog-actions">
                      <button type="submit" name="status" value="draft" className="secondary">Save Draft</button>
                      <button type="submit" name="status" value="published">Publish Post</button>
                    </div>
                  </div>
                ) : (
                <div className="admin-modal-editor-grid">
                  <section className="admin-modal-main-editor">
                    <p className="admin-panel-kicker">{draft.type}s / {draft.slug ? "Editing" : "New Draft"}</p>
                    <div className="admin-modal-actions">
                      <button type="submit" name="status" value="draft" className="secondary">Save Draft</button>
                      <button type="submit" name="status" value="published">
                        {contentKind === "insight" ? (draft.slug ? "Update Insight" : "Publish Insight") : (draft.slug ? "Update Story" : "Upload Story")}
                      </button>
                    </div>

                    {!preview ? (
                      <>
                        <label className="admin-modal-title-field">
                          <span>Headline</span>
                          <input name="title" value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} placeholder="Enter a compelling title..." required />
                        </label>

                        <label className="admin-modal-excerpt-field">
                          <span>SEO / Card Excerpt</span>
                          <textarea name="excerpt" rows="2" value={draft.excerpt} onChange={(event) => updateDraft("excerpt", event.target.value)} placeholder="Short summary for cards, search engines and previews..." required />
                        </label>

                        <div className="admin-editor-shell">
                          <div className="admin-editor-toolbar" aria-label="Formatting tools">
                            <button type="button" onClick={() => format("bold")} aria-label="Bold text">B</button>
                            <button type="button" onClick={() => format("italic")} aria-label="Italic text">/</button>
                            <button type="button" onClick={() => format("underline")} aria-label="Underline text">U</button>
                            <button type="button" onClick={() => format("formatBlock", "H1")} aria-label="Heading level 1">H1</button>
                            <button type="button" onClick={() => format("formatBlock", "H2")} aria-label="Heading level 2">H2</button>
                            <button type="button" onClick={() => format("formatBlock", "BLOCKQUOTE")} aria-label="Block quote">”</button>
                            <button type="button" onClick={() => format("insertUnorderedList")} aria-label="Bulleted list">☷</button>
                            <button type="button" onClick={addLink} aria-label="Add link">⌁</button>
                          </div>
                          <div
                            ref={editorRef}
                            className="admin-rich-editor admin-modal-rich-editor"
                            contentEditable
                            role="textbox"
                            aria-label="Story body"
                            aria-multiline="true"
                            suppressContentEditableWarning
                            data-placeholder="Begin drafting here..."
                            onInput={() => setBodyHtml(editorRef.current?.innerHTML || "")}
                          />
                        </div>
                      </>
                    ) : (
                      <article className="admin-article-preview">
                        <p className="eyebrow">{contentKind === "insight" ? draft.category : `${draft.category} / ${draft.location}`}</p>
                        <h1>{draft.title || "Untitled story"}</h1>
                        <p>{draft.excerpt || "Story excerpt will appear here."}</p>
                        <div className="story-rich-body" dangerouslySetInnerHTML={{ __html: bodyHtml || "<p>Start writing to preview the story body.</p>" }} />
                      </article>
                    )}
                  </section>

                  <aside className="admin-modal-side">
                    <section>
                      <h3>{contentKind === "insight" ? "Insight Details" : "Story Details"}</h3>
                      <label>
                        <span>Author</span>
                        <input name="author" value={draft.author} onChange={(event) => updateDraft("author", event.target.value)} placeholder="Name of writer/contributor" />
                      </label>
                      {contentKind === "insight" ? (
                        <label>
                          <span>Reading Time</span>
                          <input name="readingTime" value={draft.readingTime} onChange={(event) => updateDraft("readingTime", event.target.value)} placeholder="8" />
                        </label>
                      ) : (
                        <div className="admin-form-row">
                          <label>
                            <span>Reading Time</span>
                            <input name="readingTime" value={draft.readingTime} onChange={(event) => updateDraft("readingTime", event.target.value)} placeholder="8" />
                          </label>
                          <label>
                            <span>Location</span>
                            <input name="location" value={draft.location} onChange={(event) => updateDraft("location", event.target.value)} />
                          </label>
                        </div>
                      )}
                      <label>
                        <span>Category</span>
                        <select name="category" value={draft.category} onChange={(event) => updateDraft("category", event.target.value)}>
                          {contentKind === "insight"
                            ? insightCategories.map((category) => <option key={category}>{category}</option>)
                            : (
                              <>
                                <option>Documentary</option>
                                <option>Photography</option>
                                <option>Event Coverage</option>
                                <option>Education</option>
                                <option>Health</option>
                                <option>Climate</option>
                                <option>Community Impact</option>
                              </>
                            )}
                        </select>
                      </label>
                    </section>

                    <section>
                      <h3>Teaser Media</h3>
                      <p>Visual used for cards, feeds and story pages.</p>
                      <label className="admin-upload-box">
                        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={uploadImage} />
                        <span>{uploading ? "Uploading..." : draft.image ? "Image Added" : "Upload Teaser Media"}</span>
                      </label>
                      <label>
                        <span>Image URL</span>
                        <input name="image" value={draft.image} onChange={(event) => updateDraft("image", event.target.value)} placeholder="/assets/images/story-mothers-hope.webp" />
                      </label>
                      <label>
                        <span>Alt Text</span>
                        <input name="alt" value={draft.alt} onChange={(event) => updateDraft("alt", event.target.value)} placeholder="Describe the image" />
                      </label>
                    </section>
                  </aside>
                </div>
                )}
              </form>
            </div>
          </div>
        )}

        {view === "dashboard" && (
        <section className="admin-panel admin-library-panel" id="stories-list">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-panel-kicker">Library</p>
              <h2>Website Stories</h2>
            </div>
            <button type="button" className="admin-small-action" onClick={() => startNew("Article")}>New Story</button>
          </div>
          <div className="admin-story-table">
            {stories.map((story) => (
              <article key={story.slug}>
                <div>
                  <strong>{story.title}</strong>
                  <p>{story.category} / {story.location} {story.isLocal ? "/ Managed here" : "/ Default content"}</p>
                </div>
                <span>{story.type || "Story"}</span>
                {story.status === "draft" && <span className="admin-draft-badge">Draft</span>}
                <button type="button" onClick={() => editStory(story)}>Edit</button>
                <Link href={`/stories/${story.slug}`}>Preview</Link>
                {story.isLocal && (
                  <form action="/api/admin/stories/delete" method="post" onSubmit={(event) => {
                    if (!window.confirm("Delete this story from the website?")) event.preventDefault();
                  }}>
                    <input type="hidden" name="slug" value={story.slug} />
                    <button type="submit" className="danger">Delete</button>
                  </form>
                )}
              </article>
            ))}
          </div>
        </section>
        )}

        {view === "dashboard" && (
        <section className="admin-panel admin-library-panel" id="insights-list">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-panel-kicker">Library</p>
              <h2>Website Insights</h2>
            </div>
            <button type="button" className="admin-small-action" onClick={startNewInsight}>New Insight</button>
          </div>
          <div className="admin-story-table">
            {insights.length ? insights.map((insight) => (
              <article key={insight.slug}>
                <div>
                  <strong>{insight.title}</strong>
                  <p>{insight.category} {insight.isLocal ? "/ Managed here" : "/ Default content"}</p>
                </div>
                <span>Insight</span>
                {insight.status === "draft" && <span className="admin-draft-badge">Draft</span>}
                <button type="button" onClick={() => editInsight(insight)}>Edit</button>
                <Link href={`/insights/${insight.slug}`}>Preview</Link>
                {insight.isLocal && (
                  <form action="/api/admin/insights/delete" method="post" onSubmit={(event) => {
                    if (!window.confirm("Delete this insight from the website?")) event.preventDefault();
                  }}>
                    <input type="hidden" name="slug" value={insight.slug} />
                    <button type="submit" className="danger">Delete</button>
                  </form>
                )}
              </article>
            )) : (
              <div className="admin-empty-state">No insights yet. Use "New Insight" above to publish the first one.</div>
            )}
          </div>
        </section>
        )}

        {view === "settings" && (
        <section className="admin-panel admin-settings-panel" id="settings">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-panel-kicker">Website Settings</p>
              <h2>Contact & Social Details</h2>
            </div>
          </div>
          <form action="/api/admin/settings" method="post" className="admin-story-form admin-settings-form">
            <div className="admin-form-row">
              <label>
                <span>Site Name</span>
                <input name="name" defaultValue={site.name} />
              </label>
              <label>
                <span>Tagline</span>
                <input name="tagline" defaultValue={site.tagline} />
              </label>
            </div>
            <label>
              <span>Description</span>
              <textarea name="description" rows="3" defaultValue={site.description} />
            </label>
            <div className="admin-form-row">
              <label>
                <span>Email</span>
                <input name="email" defaultValue={site.email} />
              </label>
              <label>
                <span>Phone</span>
                <input name="displayPhone" defaultValue={site.displayPhone} />
              </label>
            </div>
            <input type="hidden" name="phone" defaultValue={site.phone} />
            <label>
              <span>Location</span>
              <input name="location" defaultValue={site.location} />
            </label>
            <div className="admin-form-row">
              <label>
                <span>Instagram</span>
                <input name="instagram" defaultValue={site.social?.instagram} />
              </label>
              <label>
                <span>LinkedIn</span>
                <input name="linkedin" defaultValue={site.social?.linkedin} />
              </label>
            </div>
            <label>
              <span>YouTube</span>
              <input name="youtube" defaultValue={site.social?.youtube} />
            </label>
            <button type="submit">Save Settings</button>
          </form>
        </section>
        )}
      </section>
    </main>
  );
}

function Notice({ type, title, text }) {
  return (
    <section className={`admin-alert ${type}`}>
      <strong>{title}</strong>
      <p>{text}</p>
    </section>
  );
}
