export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface CodeTemplate {
  language: string;
  id: string;
  extension: string;
  defaultCode: string;
}

export interface ProblemDetail {
  id: string;
  number: number;
  title: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  category: string;
  acceptance: number;
  solvedStatus?: "SOLVED" | "ATTEMPTED" | "UNSOLVED";
  description: string;
  examples: TestCase[];
  constraints: string[];
  tags: string[];
  templates: CodeTemplate[];
  hints?: string[];
  editorial?: {
    approach: string;
    complexity: { time: string; space: string };
    code: Record<string, string>;
  };
}

export const CODE_TEMPLATES_BY_LANG: Record<string, (functionName: string) => string> = {
  javascript: (fn = "twoSum") => `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var ${fn} = function(nums, target) {
    // Write your solution here
    
};`,
  typescript: (fn = "twoSum") => `function ${fn}(nums: number[], target: number): number[] {
    // Write your solution here
    return [];
};`,
  python: (fn = "two_sum") => `class Solution:
    def ${fn}(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        pass`,
  cpp: (fn = "twoSum") => `#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> ${fn}(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`,
  java: (fn = "twoSum") => `import java.util.*;

class Solution {
    public int[] ${fn}(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
  go: (fn = "twoSum") => `package main

func ${fn}(nums []int, target int) []int {
    // Write your solution here
    return []int{}
}`,
  rust: (fn = "two_sum") => `impl Solution {
    pub fn ${fn}(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Write your solution here
        vec![]
    }
}`,
};

export const MOCK_PROBLEM_DETAILS: Record<string, ProblemDetail> = {
  "two-sum": {
    id: "1",
    number: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "EASY",
    category: "Array & Hash Table",
    acceptance: 52.4,
    solvedStatus: "SOLVED",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the *same* element twice.

You can return the answer in any order.`,
    examples: [
      {
        id: 1,
        input: "nums = [2,7,11,15], target = 9",
        expectedOutput: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        id: 2,
        input: "nums = [3,2,4], target = 6",
        expectedOutput: "[1,2]",
      },
      {
        id: 3,
        input: "nums = [3,3], target = 6",
        expectedOutput: "[0,1]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    tags: ["Array", "Hash Table"],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Optimization is key.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x. Can we change array search to constant time search?",
      "Can we use additional space to store visited numbers for O(1) lookup?",
    ],
    templates: [
      { language: "JavaScript", id: "javascript", extension: "js", defaultCode: CODE_TEMPLATES_BY_LANG.javascript("twoSum") },
      { language: "TypeScript", id: "typescript", extension: "ts", defaultCode: CODE_TEMPLATES_BY_LANG.typescript("twoSum") },
      { language: "Python 3", id: "python", extension: "py", defaultCode: CODE_TEMPLATES_BY_LANG.python("two_sum") },
      { language: "C++", id: "cpp", extension: "cpp", defaultCode: CODE_TEMPLATES_BY_LANG.cpp("twoSum") },
      { language: "Java", id: "java", extension: "java", defaultCode: CODE_TEMPLATES_BY_LANG.java("twoSum") },
      { language: "Go", id: "go", extension: "go", defaultCode: CODE_TEMPLATES_BY_LANG.go("twoSum") },
      { language: "Rust", id: "rust", extension: "rs", defaultCode: CODE_TEMPLATES_BY_LANG.rust("two_sum") },
    ],
    editorial: {
      approach: "Using a Hash Map (One-pass Hash Table) to store complement indices.",
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
        javascript: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};`,
      },
    },
  },
  "palindrome-number": {
    id: "9",
    number: 9,
    title: "Palindrome Number",
    slug: "palindrome-number",
    difficulty: "EASY",
    category: "Math",
    acceptance: 55.1,
    solvedStatus: "SOLVED",
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a **palindrome**, and \`false\` otherwise.`,
    examples: [
      {
        id: 1,
        input: "x = 121",
        expectedOutput: "true",
        explanation: "121 reads as 121 from left to right and from right to left.",
      },
      {
        id: 2,
        input: "x = -121",
        expectedOutput: "false",
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.",
      },
      {
        id: 3,
        input: "x = 10",
        expectedOutput: "false",
        explanation: "Reads 01 from right to left. Therefore it is not a palindrome.",
      },
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1",
    ],
    tags: ["Math"],
    hints: [
      "Beware of overflow when reversing the integer.",
      "Could you solve it without converting the integer to a string?",
    ],
    templates: [
      { language: "JavaScript", id: "javascript", extension: "js", defaultCode: `var isPalindrome = function(x) {\n    // Write code here\n};` },
      { language: "TypeScript", id: "typescript", extension: "ts", defaultCode: `function isPalindrome(x: number): boolean {\n    // Write code here\n    return false;\n};` },
      { language: "Python 3", id: "python", extension: "py", defaultCode: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        # Write code here\n        pass` },
      { language: "C++", id: "cpp", extension: "cpp", defaultCode: `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        // Write code here\n        return false;\n    }\n};` },
    ],
  },
};

export function getProblemDetailBySlug(slug: string, fallbackBasicInfo?: any): ProblemDetail {
  if (MOCK_PROBLEM_DETAILS[slug]) {
    return MOCK_PROBLEM_DETAILS[slug];
  }

  const title = fallbackBasicInfo?.title || slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const number = fallbackBasicInfo?.number || 101;
  const difficulty = fallbackBasicInfo?.difficulty || "MEDIUM";
  const category = fallbackBasicInfo?.category || "Algorithms";
  const tags = fallbackBasicInfo?.tags || ["Array", "Algorithm"];

  return {
    id: String(number),
    number,
    title,
    slug,
    difficulty,
    category,
    acceptance: fallbackBasicInfo?.acceptance || 50.0,
    solvedStatus: fallbackBasicInfo?.solvedStatus || "UNSOLVED",
    description: `Given the parameters for **${title}**, process the input according to the problem constraints and return the calculated result.

#### Problem Statement
Write an efficient algorithm that takes the specified input structures and computes the expected solution in optimal time and space complexity.`,
    examples: [
      {
        id: 1,
        input: "input_data = [1, 2, 3, 4]",
        expectedOutput: "[4, 3, 2, 1]",
        explanation: "Standard example transformation demonstrating problem requirements.",
      },
      {
        id: 2,
        input: "input_data = []",
        expectedOutput: "[]",
      },
    ],
    constraints: [
      "1 <= input_data.length <= 10^5",
      "-10^4 <= input_data[i] <= 10^4",
      "Time Complexity target: O(N log N) or better.",
    ],
    tags,
    templates: [
      { language: "JavaScript", id: "javascript", extension: "js", defaultCode: CODE_TEMPLATES_BY_LANG.javascript("solve") },
      { language: "TypeScript", id: "typescript", extension: "ts", defaultCode: CODE_TEMPLATES_BY_LANG.typescript("solve") },
      { language: "Python 3", id: "python", extension: "py", defaultCode: CODE_TEMPLATES_BY_LANG.python("solve") },
      { language: "C++", id: "cpp", extension: "cpp", defaultCode: CODE_TEMPLATES_BY_LANG.cpp("solve") },
      { language: "Java", id: "java", extension: "java", defaultCode: CODE_TEMPLATES_BY_LANG.java("solve") },
      { language: "Go", id: "go", extension: "go", defaultCode: CODE_TEMPLATES_BY_LANG.go("solve") },
      { language: "Rust", id: "rust", extension: "rs", defaultCode: CODE_TEMPLATES_BY_LANG.rust("solve") },
    ],
  };
}
