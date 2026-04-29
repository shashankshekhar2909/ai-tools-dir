import { Category } from "@/lib/types";

type ToolDefaults = {
  name?: string;
  slug?: string;
  categoryId?: string;
  pricingType?: string;
  startingPrice?: string;
  rating?: string;
  shortDescription?: string;
  longDescription?: string;
  bestFor?: string;
  websiteUrl?: string;
  pros?: string;
  cons?: string;
  useCases?: string;
  tags?: string;
  isEditorsPick?: boolean;
  isHot?: boolean;
};

export function toolFormFields(categories: Category[], defaults: ToolDefaults = {}) {
  return (
    <>
      {/* Row 1: name + slug */}
      <div className="admin-form-row">
        <div className="admin-field">
          <label className="admin-label" htmlFor="tf-name">Tool name</label>
          <input
            id="tf-name"
            name="name"
            defaultValue={defaults.name}
            placeholder="e.g. ChatGPT"
            className="admin-input"
            required
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="tf-slug">Slug</label>
          <input
            id="tf-slug"
            name="slug"
            defaultValue={defaults.slug}
            placeholder="tool-slug"
            className="admin-input"
            required
          />
        </div>
      </div>

      {/* Row 2: category + pricing + rating + starting price */}
      <div className="admin-form-row">
        <div className="admin-field">
          <label className="admin-label" htmlFor="tf-category">Category</label>
          <select
            id="tf-category"
            name="categoryId"
            defaultValue={defaults.categoryId}
            className="admin-select"
            required
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="tf-pricing">Pricing type</label>
          <select
            id="tf-pricing"
            name="pricingType"
            defaultValue={defaults.pricingType || "Freemium"}
            className="admin-select"
            required
          >
            <option value="Free">Free</option>
            <option value="Freemium">Freemium</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="tf-rating">Rating (1–5)</label>
          <input
            id="tf-rating"
            name="rating"
            type="number"
            step="0.1"
            min="1"
            max="5"
            defaultValue={defaults.rating || "4.0"}
            className="admin-input"
            required
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="tf-starting-price">Starting price</label>
          <input
            id="tf-starting-price"
            name="startingPrice"
            defaultValue={defaults.startingPrice}
            placeholder="e.g. $20/mo"
            className="admin-input"
          />
        </div>
      </div>

      {/* Website URL */}
      <div className="admin-field">
        <label className="admin-label" htmlFor="tf-website">Website URL</label>
        <input
          id="tf-website"
          name="websiteUrl"
          defaultValue={defaults.websiteUrl}
          placeholder="https://..."
          className="admin-input"
        />
      </div>

      {/* Short description */}
      <div className="admin-field">
        <label className="admin-label" htmlFor="tf-short-desc">Short description</label>
        <textarea
          id="tf-short-desc"
          name="shortDescription"
          defaultValue={defaults.shortDescription}
          placeholder="1–2 sentence summary"
          rows={2}
          className="admin-textarea"
          required
        />
      </div>

      {/* Long description */}
      <div className="admin-field">
        <label className="admin-label" htmlFor="tf-long-desc">Long description</label>
        <textarea
          id="tf-long-desc"
          name="longDescription"
          defaultValue={defaults.longDescription}
          placeholder="Full description"
          rows={4}
          className="admin-textarea"
          required
        />
      </div>

      {/* Best for */}
      <div className="admin-field">
        <label className="admin-label" htmlFor="tf-best-for">Best for</label>
        <input
          id="tf-best-for"
          name="bestFor"
          defaultValue={defaults.bestFor}
          placeholder="Who this is best suited for"
          className="admin-input"
          required
        />
      </div>

      {/* Row: pros + cons */}
      <div className="admin-form-row">
        <div className="admin-field">
          <label className="admin-label" htmlFor="tf-pros">Pros <span className="admin-label-hint">(comma-separated)</span></label>
          <input
            id="tf-pros"
            name="pros"
            defaultValue={defaults.pros}
            placeholder="Fast, Cheap, Easy to use"
            className="admin-input"
            required
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="tf-cons">Cons <span className="admin-label-hint">(comma-separated)</span></label>
          <input
            id="tf-cons"
            name="cons"
            defaultValue={defaults.cons}
            placeholder="Limited context, Expensive API"
            className="admin-input"
            required
          />
        </div>
      </div>

      {/* Row: use cases + tags */}
      <div className="admin-form-row">
        <div className="admin-field">
          <label className="admin-label" htmlFor="tf-use-cases">Use cases <span className="admin-label-hint">(comma-separated)</span></label>
          <input
            id="tf-use-cases"
            name="useCases"
            defaultValue={defaults.useCases}
            placeholder="Coding, Writing, Research"
            className="admin-input"
            required
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="tf-tags">Tags <span className="admin-label-hint">(comma-separated)</span></label>
          <input
            id="tf-tags"
            name="tags"
            defaultValue={defaults.tags}
            placeholder="ai, chatbot, gpt"
            className="admin-input"
            required
          />
        </div>
      </div>

      {/* Flags */}
      <div style={{ display: "flex", gap: "2rem" }}>
        <label className="admin-checkbox-label">
          <input name="isEditorsPick" type="checkbox" defaultChecked={defaults.isEditorsPick} className="admin-checkbox" />
          Editor&apos;s pick
        </label>
        <label className="admin-checkbox-label">
          <input name="isHot" type="checkbox" defaultChecked={defaults.isHot} className="admin-checkbox" />
          Hot tool
        </label>
      </div>
    </>
  );
}
