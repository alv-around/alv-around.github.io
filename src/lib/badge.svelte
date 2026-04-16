<script lang="ts">
  // The text to display inside the badge.
  export let text: string;

  // The color of the badge.
  type BadgeColor =
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
    | "orange";
  export let color: BadgeColor = "gray"; // Default color

  // Determine the Tailwind classes based on the color prop
  let bgColorClass: string;
  let textColorClass: string;
  let ringColorClass: string;

  $: {
    // Reactive declaration: re-runs when 'color' changes
    switch (color) {
      case "gray":
        bgColorClass = "bg-gray-50";
        textColorClass = "text-gray-600";
        ringColorClass = "ring-gray-500/10";
        break;
      case "red":
        bgColorClass = "bg-red-50";
        textColorClass = "text-red-700";
        ringColorClass = "ring-red-600/10";
        break;
      case "yellow":
        bgColorClass = "bg-yellow-50";
        textColorClass = "text-yellow-800";
        ringColorClass = "ring-yellow-600/20";
        break;
      case "green":
        bgColorClass = "bg-green-50";
        textColorClass = "text-green-700";
        ringColorClass = "ring-green-600/20";
        break;
      case "blue":
        bgColorClass = "bg-blue-50";
        textColorClass = "text-blue-700";
        ringColorClass = "ring-blue-700/10";
        break;
      case "indigo":
        bgColorClass = "bg-indigo-50";
        textColorClass = "text-indigo-700";
        ringColorClass = "ring-indigo-700/10";
        break;
      case "purple":
        bgColorClass = "bg-purple-50";
        textColorClass = "text-purple-700";
        ringColorClass = "ring-purple-700/10";
        break;
      case "pink":
        bgColorClass = "bg-pink-50";
        textColorClass = "text-pink-700";
        ringColorClass = "ring-pink-700/10";
        break;
      case "orange":
        bgColorClass = "bg-orange-50";
        textColorClass = "text-orange-700";
        ringColorClass = "ring-orange-700/10";
        break;
      default:
        // Fallback to gray if an unknown color is provided
        bgColorClass = "bg-gray-50";
        textColorClass = "text-gray-600";
        ringColorClass = "ring-gray-500/10";
    }
  }
</script>

<span
  class="inline-flex items-center rounded-md h-7  px-2 py-1 text-xs font-medium font-sans ring-1 ring-inset {bgColorClass} {textColorClass} {ringColorClass}"
>
  {text}
</span>

<style>
span {
  margin-top: 1px;
}
</style>
