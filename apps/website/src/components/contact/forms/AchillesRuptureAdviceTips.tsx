import React, { useState } from "react";
import { PlusCircle, XCircle } from "lucide-react";

const AchillesRuptureAdviceTips: React.FC = () => {
  const [visibleTips, setVisibleTips] = useState(1);
  const maxTips = 3;

  const addTip = () => {
    if (visibleTips < maxTips) {
      setVisibleTips(visibleTips + 1);
    }
  };

  const removeTip = (index: number) => {
    setVisibleTips(index - 1);

    //clear text areas
    for (let i = index; i <= maxTips; i++) {
      const textarea = document.getElementById(
        `tip${i}`,
      ) as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.value = "";
      }
    }
  };

  return (
    <div className="space-y-4 mt-4" id="tipsContainer">
      {/* Tip 1 - Always visible */}
      <div className="form-group tip-group" id="tip1Container">
        <label className="font-semibold text-gray-700 text-md">Tip #1</label>
        <textarea
          name="tip1"
          rows={4}
          maxLength={500}
          placeholder="Share your first recovery tip..."
          required={true}
        />
      </div>

      {/* Tip 2 */}
      {visibleTips >= 2 && (
        <div className="form-group tip-group" id="tip2Container">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-gray-700 text-md">
              Tip #2
            </label>
            <button
              type="button"
              onClick={() => removeTip(2)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
            >
              <XCircle size={16} />
              Remove
            </button>
          </div>
          <textarea
            name="tip2"
            rows={4}
            maxLength={500}
            placeholder="Share another recovery tip..."
            id="tip2"
          />
        </div>
      )}

      {/* Tip 3 */}
      {visibleTips >= 3 && (
        <div className="form-group tip-group" id="tip3Container">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-gray-700 text-md">
              Tip #3
            </label>
            <button
              type="button"
              onClick={() => removeTip(3)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
            >
              <XCircle size={16} />
              Remove
            </button>
          </div>
          <textarea
            name="tip3"
            rows={4}
            maxLength={500}
            placeholder="Share another recovery tip..."
            id="tip3"
          />
        </div>
      )}

      <button
        type="button"
        onClick={addTip}
        id="addTipBtn"
        className="flex items-center gap-2 font-medium text-primary hover:text-primary/90"
        style={{ display: visibleTips >= maxTips ? "none" : "flex" }}
      >
        <PlusCircle size={20} />
        Add Another Tip
      </button>
    </div>
  );
};

export default AchillesRuptureAdviceTips;
