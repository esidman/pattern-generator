import React from "react";
import classNames from "classnames";
import { useProjectContext } from "../Context/ProjectContext";

function ColorPicker({ colorPickerType }) {
  const [projectState, projectDispatch] = useProjectContext();

  const isPatternColorSelected = (color) => {
    if (colorPickerType === "SET_PATTERN_COLOR") {
      return projectState.patternColor === color;
    }
    if (colorPickerType === "SET_BACKGROUND_COLOR") {
      return projectState.backgroundColor === color;
    }
  };

  return (
    <div className="color-button-block">
      <button
        className={classNames(
          "lively-lavender",
          isPatternColorSelected("#F0E4EB")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Lively Lavender"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#F0E4EB",
          });
        }}
      >
        {/* Lively Lavendar */}
      </button>
      <button
        className={classNames(
          "brash-burgundy",
          isPatternColorSelected("#8D134D")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Brash Burgundy"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#8D134D",
          });
        }}
      >
        {/* Brash Burgundy */}
      </button>
      <button
        className={classNames(
          "black-raspberry",
          isPatternColorSelected("#341225")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Black Raspberry"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#341225",
          });
        }}
      >
        {/* Black Raspberry */}
      </button>
      <button
        className={classNames(
          "cold-indigo",
          isPatternColorSelected("#96BCBC")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Cold Indigo"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#96BCBC",
          });
        }}
      >
        {/* Cold Indigo */}
      </button>
      <button
        className={classNames(
          "medium-indigo",
          isPatternColorSelected("#0A2C49")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Medium Indigo"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#0A2C49",
          });
        }}
      >
        {/* Medium Indigo */}
      </button>
      <button
        className={classNames(
          "dark-indigo",
          isPatternColorSelected("#001129")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Dark Indigo"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#001129",
          });
        }}
      >
        {/* Dark Indigo */}
      </button>
      <button
        className={classNames(
          "website-white",
          isPatternColorSelected("#fbfbf5")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Website White"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#fbfbf5",
          });
        }}
      >
        {/* Website White */}
      </button>
      <button
        className={classNames(
          "giddy-green",
          isPatternColorSelected("#E4F2E4")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Giddy Green"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#E4F2E4",
          });
        }}
      >
        {/* Giddy Green */}
      </button>
      <button
        className={classNames(
          "growing-green",
          isPatternColorSelected("#80998C")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Growing Green"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#80998C",
          });
        }}
      >
        {/* Growing Green */}
      </button>
      <button
        className={classNames(
          "graceful-olive",
          isPatternColorSelected("#6F7347")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Graceful Olive"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#6F7347",
          });
        }}
      >
        {/* Graceful Olive */}
      </button>
      <button
        className={classNames(
          "forest-green",
          isPatternColorSelected("#2D3F23")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Forest Green"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#2D3F23",
          });
        }}
      >
        {/* Forest Green */}
      </button>
      <button
        className={classNames(
          "youthful-yellow",
          isPatternColorSelected("#fbef4f")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Youthful Yellow"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#fbef4f",
          });
        }}
      >
        {/* Youthful Yellow */}
      </button>
      <button
        className={classNames(
          "yearning-yellow",
          isPatternColorSelected("#fedc34")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Yearning Yellow"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#fedc34",
          });
        }}
      >
        {/* Yearning Yellow */}
      </button>
      <button
        className={classNames(
          "mature-yellow",
          isPatternColorSelected("#fdbe14")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Mature Yellow"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#fdbe14",
          });
        }}
      >
        {/* Mature Yellow */}
      </button>
      <button
        className={classNames(
          "original-ochre",
          isPatternColorSelected("#D3AD44")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Original Ochre"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#D3AD44",
          });
        }}
      >
        {/* Original Ochre */}
      </button>
      <button
        className={classNames(
          "talented-tan",
          isPatternColorSelected("#ae8035")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Talented Tan"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#ae8035",
          });
        }}
      >
        {/* Talented Tan */}
      </button>
      <button
        className={classNames(
          "balanced-brown",
          isPatternColorSelected("#664516")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Balanced Brown"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#664516",
          });
        }}
      >
        {/* Balanced Brown */}
      </button>
      <button
        className={classNames(
          "playful-peach",
          isPatternColorSelected("#edae9f")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Playful Peach"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#edae9f",
          });
        }}
      >
        {/* Playful Peach */}
      </button>
      <button
        className={classNames(
          "rebellious-red",
          isPatternColorSelected("#f06553")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Rebellious Red"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#f06553",
          });
        }}
      >
        {/* Rebellious Red */}
      </button>
      <button
        className={classNames(
          "ripened-red",
          isPatternColorSelected("#962f1e")
            ? "color-button-selected"
            : "color-button"
        )}
        title="Ripened Red"
        onClick={() => {
          projectDispatch({
            type: colorPickerType,
            payload: "#962f1e",
          });
        }}
      >
        {/* Ripened Red */}
      </button>
    </div>
  );
}

export default ColorPicker;
