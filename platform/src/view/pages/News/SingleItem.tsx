import React from "react";
import Dates from "src/view/shared/utils/Dates";

function SingleItem(props) {
  const { topic, loading } = props;

  return (
    <>
      {topic?.map((item, index) => (
        <div className="news-item" key={index}>
          <div className="news-header">
            <div className="news-source">
              <i className="fas fa-newspaper" />
            </div>
            <div className="news-info">
              <div className="news-source-name">{item?.meta.sourceName}</div>
              <div className="news-date">
                {" "}
                {Dates.NewsDate(item.meta.updatedAt)}
              </div>
            </div>
          </div>
          <div className="news-title">{item?.meta?.title}</div>
          <div className="news-content">{item?.meta?.subtitle}</div>
          <img loading="lazy" src={item?.cover} className="news-image" />

          <div className="news-footer">
            <div className="news-tags">
              {item.assets.map((item) => (
                <span
                  className="news-tag"
                  style={{ display: "flex", alignItems: "center", gap: 3 }}
                >
                  <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.coinId}.png`}
                    alt=""
                    style={{ width: 10, height: 10 }}
                  />{" "}
                  {item.symbol}
                </span>
              ))}
            </div>
            <div className="news-actions"></div>
          </div>
        </div>
      ))}

      {/* Embedded styles – matching the app's dark theme */}
      <style>{`
        .news-item {
          background-color: #15161c;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          transition: background-color 0.2s;
        }
        .news-item:hover {
          background-color: rgba(253, 75, 78, 0.05);
        }

        .news-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .news-source {
          width: 36px;
          height: 36px;
          background-color: #0e0f14;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fd4b4e;
          font-size: 14px;
          flex-shrink: 0;
        }

        .news-info {
          flex: 1;
        }

        .news-source-name {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .news-date {
          color: #888888;
          font-size: 12px;
        }

        .news-title {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .news-content {
          color: #aaaaaa;
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .news-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 12px;
          background-color: #0e0f14;
        }

        .news-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #2a2a2e;
          padding-top: 12px;
        }

        .news-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .news-tag {
          background-color: #0e0f14;
          color: #ffffff;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .news-tag img {
          border-radius: 50%;
        }

        .news-actions {
          display: flex;
          gap: 12px;
        }
      `}</style>
    </>
  );
}

export default SingleItem;