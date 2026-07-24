
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'


type prop = {
    record : SessionDetail
}

function ViewReportDialog({ record }: prop) {

  const report = record?.report as
  | {
      agent?: string;
      user?: string;
      chiefComplaint?: string;
      summary?: string;
      symptoms?: string[];
      duration?: string;
      severity?: string;
      medicationsMentioned?: string[];
      recommendations?: string[];
    }
  | undefined;

  const formatDate = (date: string) => {
    if (!date) return 'Not specified'
    return moment(new Date(date)).format('MMMM Do YYYY, h:mm a')
  }

  const listItems = (items: unknown) => {
    if (Array.isArray(items)) return items.filter(Boolean) as string[]
    if (typeof items === 'string' && items.trim()) return [items]
    return []
  }

  const symptoms = listItems(report?.symptoms)
  const medications = listItems(report?.medicationsMentioned)
  const recommendations = listItems(report?.recommendations)

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" size="sm">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto p-10">
        <DialogHeader className="items-center">
          <DialogTitle className="mx-auto text-center text-2xl font-semibold text-sky-700">
            Medical AI Voice Agent Report
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <div className="space-y-8 text-sm text-slate-700">
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-sky-600">Session Info</h2>
              </div>
              <div className="h-px w-full bg-sky-400/50" />
              <div className="grid gap-4 text-slate-700 sm:grid-cols-2">
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold text-slate-900">Doctor:</span>{' '}
                    {record.selectedDoctor?.specialist ?? 'Unknown'}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Consulted On:</span>{' '}
                    {formatDate(record.createdOn)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold text-slate-900">User:</span>{' '}
                    {report?.user ?? 'Anonymous'}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Agent:</span>{' '}
                    {report?.agent ?? `${record.selectedDoctor?.specialist ?? 'Medical'} AI`}
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-sky-600">Chief Complaint</h2>
              </div>
              <div className="h-px w-full bg-sky-400/50" />
              <p className="text-slate-700">
                {report?.chiefComplaint ?? 'No chief complaint available.'}
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-sky-600">Summary</h2>
              </div>
              <div className="h-px w-full bg-sky-400/50" />
              <p className="leading-7 text-slate-700">
                {report?.summary ?? 'No summary available.'}
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-sky-600">Symptoms</h2>
              </div>
              <div className="h-px w-full bg-sky-400/50" />
              {symptoms.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5 text-slate-700">
                  {symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600">No symptoms were recorded.</p>
              )}
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-sky-600">Duration & Severity</h2>
              </div>
              <div className="h-px w-full bg-sky-400/50" />
              <div className="grid gap-4 text-slate-700 sm:grid-cols-2">
                <p>
                  <span className="font-semibold text-slate-900">Duration:</span>{' '}
                  {report?.duration ?? 'Not specified'}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Severity:</span>{' '}
                  {report?.severity ?? 'Not specified'}
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-sky-600">Medications Mentioned</h2>
              </div>
              <div className="h-px w-full bg-sky-400/50" />
              {medications.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5 text-slate-700">
                  {medications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600">No medications were mentioned.</p>
              )}
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-sky-600">Recommendations</h2>
              </div>
              <div className="h-px w-full bg-sky-400/50" />
              {recommendations.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5 text-slate-700">
                  {recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600">No recommendations were generated.</p>
              )}
            </section>

            <div className="border-t border-slate-200 pt-4 text-xs text-slate-500">
              This report was generated by an AI Medical Assistant for informational purposes.
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default ViewReportDialog