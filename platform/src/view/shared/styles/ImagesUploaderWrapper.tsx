import styled from "styled-components";

const ImagesUploaderWrapper = styled.div`
  /* Upload card (outer container) */
  .upload-card {
    background-color: #15161c;
    border-radius: 14px;
    padding: 16px;                           /* reduced – padding moved to inner area */
    text-align: center;
    margin-bottom: 16px;
  }

  /* Drop‑zone (the clickable area) – now with border & padding */
  .upload-area {
    border: 1px dashed #2a2a2e;
    border-radius: 12px;
    padding: 28px 24px;
    background-color: #0e0f14;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: border-color 0.2s, background-color 0.2s;
  }

  .upload-card:hover .upload-area {
    border-color: #fd4b4e;
    background-color: rgba(253, 75, 78, 0.03);
  }

  .upload-icon i {
    font-size: 36px;
    color: #fd4b4e;
  }

  .upload-text {
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
  }

  .upload-subtext {
    color: #888888;
    font-size: 13px;
  }

  /* Uploaded image preview container */
  .uploaded-box {
    position: relative;
    width: 100%;
    border-radius: 14px;
    overflow: hidden;
    background-color: #0e0f14;
    border: 1px solid #2a2a2e;
    height: 200px;
    margin-bottom: 16px;
  }

  .uploaded-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Action buttons on the preview */
  .img-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 8px 10px;
  }

  .img-buttons button {
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }

  .img-buttons button:hover {
    color: #fd4b4e;
  }

  /* Hide file input */
  input[type="file"] {
    display: none;
  }
`;

export default ImagesUploaderWrapper;