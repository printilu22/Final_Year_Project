// form.tsx
"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GlassCard from "./Glasscard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form as RHFForm,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import clsx from "clsx";





/* ─── Schemas ──────────────────────────────────────────────────────────── */
const advisorSchema = z.object({
  fileType: z.enum(["document", "video", "photo", "audio", "database"]),
  computationalPower: z.enum(["low", "medium", "high"]),
  securityLevel: z.enum(["low", "medium", "high"]),
  realTime: z.boolean(),
  crossPlatform: z.boolean(),
});

const predictorSchema = z.object({
  encryptedText: z.string().min(1, "Encrypted text is required"),
});

/* ─── Utility types  ────────────────────────────────────────────────────── */
type AdvisorValues = z.infer<typeof advisorSchema>;
type PredictorValues = z.infer<typeof predictorSchema>;
type Mode = "advisor" | "predictor";

/* ─── Props   ───────────────────────────────────────────────────────────── */
interface BaseProps {
  loading: boolean;
}

type AdvisorProps = BaseProps & {
  type: "advisor";
  onSubmit: (v: AdvisorValues) => void;
};

type PredictorProps = BaseProps & {
  type: "predictor";
  onSubmit: (v: PredictorValues) => void;
};

type FormProps = AdvisorProps | PredictorProps;
export type FileType = "document" | "video" | "photo" | "audio" | "database";

/* ─── Component  ────────────────────────────────────────────────────────── */
export function Form(props: FormProps) {
  const { type, loading, onSubmit } = props;

  /* choose schema & default Values based on mode */

  
  const schema = type === "advisor" ? advisorSchema : predictorSchema;
  const defaultValues = type === "advisor"
    ? {
      fileType: "document",
      computationalPower: "medium",
      securityLevel: "medium",
      realTime: false,
      crossPlatform: false,
    }
    : { encryptedText: "" };

  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const error = form.formState.errors.encryptedText;

  return (
    <GlassCard className="p-6">
      <RHFForm {...form}>
        {type === "advisor" ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fileType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select file type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="photo">Photo</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The type of file you want to encrypt
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="computationalPower"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Computational Power</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select computational power" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Available computational resources for encryption
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="securityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Security Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select security level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Required level of security for your data
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="realTime"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Real-time Processing</FormLabel>
                    <FormDescription>
                      Need real-time encryption/decryption
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className=""
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="crossPlatform"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Cross-platform</FormLabel>
                    <FormDescription>
                      Need compatibility across different platforms
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Getting Recommendations..." : "Get Recommendations"}
            </Button>
          </form>

        ) : (

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full space-y-6"
          >
            <FormField
              control={form.control}
              name="encryptedText"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col">
                  {/* — label ---------------------------------------------------- */}
                  <FormLabel
                    className={clsx(
                      "transition-all",                       // smooth colour / motion
                      error && "text-green-500 animate-wiggle"
                    )}
                  >
                    Encrypted Text
                  </FormLabel>

                  {/* — textarea ------------------------------------------------- */}
                  <FormControl className="flex-1">
                    <textarea
                      {...field}
                      placeholder="Paste cipher text…"
                      className={clsx(
                        "w-full h-full resize-none rounded-md bg-transparent p-3",
                        "border outline-none transition-colors",
                        "scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent",

                        /* focus ring is always green -------------------------- */
                        "focus:border-green-500 focus:ring-2 focus:ring-green-500",

                        /* error state border / ring (keeps focus style) ------- */
                        error && "border-green-500 ring-2 ring-green-500"
                      )}
                    />
                  </FormControl>

                  {/* optional helper / error message --------------------------- */}
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-auto w-full" disabled={loading}>
              {loading ? "Predicting…" : "Predict Algorithm"}
            </Button>
          </form>
        )}
      </RHFForm>
    </GlassCard>
  );
}
